"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CONTEXT_PARAMS } from "@/lib/useHref";

// This app is served under an optional base path (e.g. `/console`). Links carry
// the base path in their `href`, but the Next router expects paths *without* it
// (it re-adds the base path itself), so we strip it before `router.push`.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Turns every in-app `<a href>` into a client-side Next.js navigation — without
 * touching the markup that produced it. Mount it once, near the app root.
 *
 * Many UI5 web components (`SideNavigation`, `ShellBar`, `Breadcrumbs`, `Link`,
 * links inside tables, …) render a real `<a href>` in their Shadow DOM and give
 * no slot to swap in a Next `<Link>`. A plain click on those does a full-page
 * reload. Rather than special-case each component, this hook installs a single
 * delegated click listener on `document` that intercepts internal links and
 * routes them through the Next router instead.
 *
 * **Shadow DOM.** Click events are `composed`, so they bubble across shadow
 * boundaries and reach `document`. `event.target` is retargeted to the host
 * element, so the real `<a>` is found via `event.composedPath()` — that is what
 * makes the interception work uniformly for both light-DOM and UI5 links.
 *
 * The handler is deliberately conservative: it only takes over a plain
 * left-click on a same-origin link that lives under this app's base path.
 * Everything the browser should own is left alone — modifier/middle clicks
 * (open in new tab), `target`, `download`, external origins, other Reltio
 * products linked from `AppSelector`/`AppNavigation`, and anchors that opt out
 * with `data-native-link`.
 *
 * The current working context (`env`/`tenant`/`customer`) is carried forward
 * onto every routed link (see `useHref` for the build-time counterpart); a link
 * opts out of that with `data-no-context`.
 */
export function useLinks(): void {
	const router = useRouter();

	useEffect(() => {
		const onClick = (event: MouseEvent): void => {
			// Let the browser handle anything that isn't a plain left-click, or a
			// click another handler already dealt with.
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			) {
				return;
			}

			// Reach the real anchor, even when it sits inside a UI5 Shadow DOM.
			const anchor = event
				.composedPath()
				.find((el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement);
			if (!anchor) return;

			// Explicit opt-out, plus the links the browser must own natively.
			if (
				anchor.dataset.nativeLink !== undefined ||
				anchor.hasAttribute("download") ||
				(anchor.target !== "" && anchor.target !== "_self")
			) {
				return;
			}

			// Same-origin only — external links (and other Reltio products on a
			// different origin) fall through to a normal navigation.
			if (anchor.origin !== window.location.origin) return;

			// Same origin but outside this app's base path means a *different* app
			// on the same host — leave it to the browser, the Next router can't
			// route it.
			if (BASE_PATH && !anchor.pathname.startsWith(BASE_PATH)) return;

			const internalPath = anchor.pathname.slice(BASE_PATH.length) || "/";

			// Carry the working context (`env`/`tenant`/`customer`) forward: fill
			// in any of those params the target link doesn't already set. A link
			// opts out with `data-no-context`, or overrides a single param just by
			// putting it in its own `href` (present keys are left untouched).
			const target = new URLSearchParams(anchor.search);
			if (anchor.dataset.noContext === undefined) {
				const current = new URLSearchParams(window.location.search);
				for (const key of CONTEXT_PARAMS) {
					const value = current.get(key);
					if (value && !target.has(key)) target.set(key, value);
				}
			}
			const query = target.toString();

			event.preventDefault();
			router.push(`${internalPath}${query ? `?${query}` : ""}${anchor.hash}`);
		};

		// Capture phase so we run before UI5's own click handling settles.
		document.addEventListener("click", onClick, { capture: true });
		return () =>
			document.removeEventListener("click", onClick, { capture: true });
	}, [router]);
}
