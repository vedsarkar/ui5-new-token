import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import isChromatic from "chromatic/isChromatic";

/**
 * One-time global setup that turns the Storybook preview into a deterministic
 * snapshot environment. Imported as a side effect from `.storybook/preview.tsx`.
 *
 * Gated on automated-environment detection (`isAutomatedEnvironment` below) so
 * that local `npm run dev` keeps the natural look-and-feel — full UI5
 * animations, real wall-clock time, real `Math.random`, real CSS transitions.
 * The snapshot tweaks only kick in under Chromatic (cloud builds and
 * `--ci` Chromatic runs) and inside `addon-vitest` browser tests, where they
 * actually matter for determinism. This avoids subtle dev-time regressions
 * like ECharts tooltips losing their smooth follow-the-cursor transition once
 * `animation: false` is merged into the option.
 *
 * Why each step exists (only applied in automated environments):
 *
 * 1. UI5 animation mode `"none"` — stops the BusyIndicator dot loop, ComboBox
 *    open transitions, Toast slide-ins, etc. UI5 honors this flag globally;
 *    no per-component change required.
 *
 * 2. Frozen wall-clock time — UI5 Calendar / DatePicker / DateTimePicker
 *    highlight "today" and default to the current month. Without this, every
 *    Chromatic baseline expires after ~24 h and the entire Calendar test
 *    family flips to "Unresolved" daily. We replace the global `Date`
 *    constructor + `Date.now` with a frozen instant; explicit `new Date(arg)`
 *    calls keep working normally.
 *
 * 3. CSS animation kill-switch — Reltio components ship a few infinite CSS
 *    animations (Skeleton shimmer being the loudest). The global
 *    `animation-duration: 0s !important` rule pins them to their first frame.
 *    We deliberately do NOT touch `transition-duration` — ECharts tooltips
 *    and many UI5 components rely on CSS transitions for smooth movement, and
 *    those transitions cannot land on an intermediate frame inside a
 *    Chromatic snapshot anyway (no hover happens during a snapshot).
 *
 * 4. `window.__reltioChartAnimationsDisabled__` flag — read by
 *    `charts/Chart/Chart.tsx` to merge `animation: false` into the ECharts
 *    option. Implemented as an opt-in flag rather than a chart-level default
 *    so production apps consuming `@reltio/design/charts` keep the normal
 *    ECharts entrance animations.
 *
 * 5. Seeded `Math.random` — the ECharts graph-series force layout uses
 *    `Math.random()` internally for repulsion jitter, which makes the final
 *    node positions of `GraphChart` differ by 1–2 px between runs and trips
 *    Chromatic into "Unstable". A mulberry32 PRNG seeded with a fixed value
 *    makes the simulation converge to the same layout every time. Modern
 *    React (`useId`) and UI5 components use their own counters / `crypto`
 *    for unique IDs, and `@faker-js/faker` ships its own seeded PRNG, so
 *    overriding the global `Math.random` does not interfere with them.
 */

declare global {
	interface Window {
		__reltioChartAnimationsDisabled__?: boolean;
	}
}

function isAutomatedEnvironment(): boolean {
	if (typeof window === "undefined") return false;
	if (isChromatic()) return true;
	// Playwright (used by Chromatic's snapshot runner and by Vitest browser
	// mode through `@vitest/browser-playwright`) sets `navigator.webdriver`
	// to `true` automatically. `npm run dev` in a regular browser leaves it
	// `false`, so this is a safe additional signal.
	return typeof navigator !== "undefined" && navigator.webdriver === true;
}

function applySnapshotEnvironment(): void {
	const FROZEN_INSTANT = Date.UTC(2026, 4, 15, 12, 0, 0);
	const OriginalDate = globalThis.Date;

	// `Date` exposes 7 distinct construct signatures (no-arg, single value,
	// 2..7-arg numeric form). Sub-classing it generically with `unknown[]`
	// would fail TypeScript's overload resolution because none of the
	// signatures accept `unknown[]`. We dispatch by `arguments.length` and
	// use `Reflect.construct` for the variadic forms — it is the only
	// construction path that does not need a matching overload up front.
	const FrozenDate = function FrozenDate(this: Date, ...args: unknown[]) {
		if (!new.target) {
			// Calling Date() as a function returns the current time as a
			// string. We mirror that, but return the frozen string instead.
			return new OriginalDate(FROZEN_INSTANT).toString();
		}
		if (args.length === 0) {
			return Reflect.construct(OriginalDate, [FROZEN_INSTANT], FrozenDate);
		}
		return Reflect.construct(OriginalDate, args, FrozenDate);
	} as unknown as DateConstructor;

	Object.setPrototypeOf(FrozenDate.prototype, OriginalDate.prototype);
	Object.setPrototypeOf(FrozenDate, OriginalDate);

	(FrozenDate as { now: () => number }).now = () => FROZEN_INSTANT;

	globalThis.Date = FrozenDate;

	setAnimationMode("none");

	window.__reltioChartAnimationsDisabled__ = true;

	// Seeded mulberry32 PRNG. Reference: https://stackoverflow.com/a/47593316
	let mulberrySeed = 0x6d2b79f5 ^ 42;
	Math.random = () => {
		mulberrySeed = (mulberrySeed + 0x6d2b79f5) | 0;
		let t = mulberrySeed;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};

	const style = document.createElement("style");
	style.setAttribute("data-reltio-snapshot-env", "true");
	// Only kill `animation` (infinite CSS keyframes — Skeleton shimmer, etc.).
	// `transition` stays alive on purpose: ECharts tooltips and many UI5
	// components rely on CSS transitions for smooth movement, and Chromatic
	// never lands a snapshot mid-transition because it does not synthesize
	// hover/focus before capturing.
	style.textContent = `
		*,
		*::before,
		*::after {
			animation-duration: 0s !important;
			animation-delay: 0s !important;
			scroll-behavior: auto !important;
		}
	`;
	document.head.appendChild(style);
}

if (isAutomatedEnvironment()) {
	applySnapshotEnvironment();
}
