#!/usr/bin/env node
/**
 * Reltio Design Platform — design-token CSS generator.
 *
 * Reads SAP Horizon design tokens from the repo-local token files
 * (`utils/sap_horizon.tokens.json`, `utils/sap_horizon_dark.tokens.json`) and
 * emits `public/variables.css`, carrying — for both themes — only the tokens
 * that are NOT identical to UI5's stock light theme in both themes. The rest are
 * left to UI5.
 *
 * ── What UI5 gives us, and what it does not ────────────────────────────────
 * The UI5 web components ship their own copy of the stock SAP Horizon theme and
 * inject it at runtime as a *constructable* stylesheet appended to
 * `document.adoptedStyleSheets` (see `@ui5/webcomponents-base` → `applyTheme` /
 * `ManagedStyles`). Crucially UI5 injects only its ACTIVE theme — the default is
 * `sap_horizon` (light) and this platform never calls `setTheme`, so what lands
 * on `:root` is always the stock LIGHT token set (`:root { --sapBrandColor:
 * #0070f2; … }`). UI5 does NOT read our `data-theme` attribute and injects no
 * dark token set.
 *
 * Consequences for what `variables.css` must carry:
 *   • A token equal to stock light in BOTH themes → omit; UI5 supplies it.
 *   • Any other token → emit in BOTH `[data-theme]` blocks (each with its own
 *     theme's value). We cannot lean on UI5 for dark values (it injects none),
 *     and both blocks must cover the SAME key set so that entering a
 *     `[data-theme]` subtree re-applies every non-constant token — otherwise a
 *     dark panel nested under a light one (Storybook's dual-theme decorator, or
 *     any nested theming) would inherit stale light values.
 *
 * The key set is computed at build time by diffing our token files against UI5's
 * injected light bundle (`@ui5/webcomponents-theming/.../sap_horizon/
 * parameters-bundle.css.json`). Comparison uses formatting normalization (so
 * `1.0` vs `1` or `#00c` vs `#0000cc` are not treated as differences) and is
 * deliberately conservative: emitting a redundant override is harmless, silently
 * dropping a real one is not.
 *
 * ── Selectors & the theming contract ───────────────────────────────────────
 * Because the stock light values now come from UI5 (not from a `:root` block in
 * this file), `data-theme` is REQUIRED — light is no longer the attribute-less
 * default. Consumers set `data-theme="sap-reltio-light"` or `"sap-reltio-dark"`
 * on an ancestor element; both Reltio CSS Modules and UI5 web components below
 * it pick up the customized values. The legacy `horizon-light` / `horizon-dark`
 * values are still accepted as a deprecated alias (see THEME_ATTR_VALUES).
 *
 * Each theme block carries, for every accepted attribute value, two selectors so
 * the attribute works at any level:
 *   • `:root[data-theme="x"]` → (0,2,0), for the attribute on the document root
 *     (`<html>`), where it must out-specify UI5's injected `:root` (0,1,0).
 *   • `[data-theme="x"]`      → (0,1,0), for the attribute on a nested element
 *     (`<body>`, a wrapper `<div>`, …). There UI5's `:root` sheet does not match
 *     at all, so the closer element wins by proximity — no boost needed.
 *
 * Cascade layers (`@layer`) can't help beat UI5's sheet: unlayered declarations
 * always win over layered ones, and UI5's injected sheet is unlayered.
 *
 * Trade-off: to override a token, a consumer needs a selector of at least the
 * same specificity — a wrapper `class` / `[data-theme]` on a non-root element
 * already qualifies (it sets the variable closer in the tree), as does an inline
 * `style` or `!important`.
 *
 * Fonts (`public/fonts.css` + the vendored `public/fonts/*.woff2`) are generated
 * separately — see `scripts/build-fonts.mjs` (`npm run build-fonts`).
 *
 * To customise tokens: edit the `utils/*.tokens.json` files, then re-run this
 * script and commit the regenerated `public/variables.css`.
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// ── Paths ────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

const LIGHT_JSON = join(ROOT, "utils/sap_horizon.tokens.json");
const DARK_JSON = join(ROOT, "utils/sap_horizon_dark.tokens.json");

const LIGHT_REL = "utils/sap_horizon.tokens.json";
const DARK_REL = "utils/sap_horizon_dark.tokens.json";

// Stock baseline = the exact theme UI5 injects at runtime. This reaches into an
// internal, unpublished path of @ui5/webcomponents-theming; loadStockBundle()
// fails loudly if it ever moves or changes shape (see the guards there), so a
// UI5 upgrade that breaks it is caught instead of silently producing a bad file.
const UI5_THEMES_REL =
	"node_modules/@ui5/webcomponents-theming/dist/generated/assets/themes";
const LIGHT_BUNDLE_REL = `${UI5_THEMES_REL}/sap_horizon/parameters-bundle.css.json`;
const LIGHT_BUNDLE = join(ROOT, LIGHT_BUNDLE_REL);

// Theme attribute values. `sap-reltio-*` is the canonical, brand-explicit name;
// `horizon-*` is kept as a deprecated alias so existing consumers keep working.
// Both resolve to the same declarations (see themeSelector).
const THEME_ATTR_VALUES = {
	light: ["sap-reltio-light", "horizon-light"],
	dark: ["sap-reltio-dark", "horizon-dark"],
};

// Build the selector list for a theme. For each accepted attribute value we emit
// a `:root[...]` form (0,2,0 — for the attribute on <html>, must out-rank UI5's
// injected `:root` at 0,1,0) and a plain `[...]` form (0,1,0 — for the attribute
// on a nested element, where it wins by proximity). See the file-level JSDoc.
const themeSelector = (theme) =>
	THEME_ATTR_VALUES[theme]
		.flatMap((value) => [
			`:root[data-theme="${value}"]`,
			`[data-theme="${value}"]`,
		])
		.join(",\n");

// ── Utilities ────────────────────────────────────────────────────────────

function autoGeneratedHeader(sources) {
	return [
		"/**",
		" * Auto-generated by scripts/build-tokens.mjs — do not edit manually.",
		" * Run: npm run build-tokens",
		` * Source: ${sources.join(", ")}`,
		" * Only tokens that differ from the stock SAP Horizon theme are emitted;",
		" * the rest are provided at runtime by the UI5 web components.",
		" */",
		"",
	].join("\n");
}

async function readTokensJson(absPath, relLabel) {
	try {
		return JSON.parse(await readFile(absPath, "utf8"));
	} catch (err) {
		if (err && err.code === "ENOENT") {
			throw new Error(
				`Cannot read ${relLabel} — file not found at ${absPath}.`,
			);
		}
		throw err;
	}
}

/**
 * Parse a UI5 `parameters-bundle.css.json` (a JSON-encoded CSS string of the
 * form `:root { --token: value; … }`) into a plain `{ token: value }` map.
 * Throws with an actionable message if the file is missing or its shape changed.
 */
async function loadStockBundle(absPath, relLabel) {
	let raw;
	try {
		raw = await readFile(absPath, "utf8");
	} catch (err) {
		if (err && err.code === "ENOENT") {
			throw new Error(
				`Cannot find the UI5 stock theme bundle at ${relLabel}. ` +
					"The @ui5/webcomponents-theming internal layout likely changed for this " +
					"UI5 version — update the path in scripts/build-tokens.mjs.",
			);
		}
		throw err;
	}

	let css;
	try {
		css = JSON.parse(raw);
	} catch {
		throw new Error(
			`UI5 stock theme bundle ${relLabel} is not the expected JSON-encoded string.`,
		);
	}
	if (typeof css !== "string") {
		throw new Error(
			`UI5 stock theme bundle ${relLabel} did not parse to a CSS string.`,
		);
	}

	const map = {};
	const re = /--([A-Za-z0-9_]+)\s*:\s*([^;]+);/g;
	for (const match of css.matchAll(re)) {
		map[match[1]] = match[2].trim();
	}

	// Sanity guard: the real bundle has well over a thousand tokens. A tiny count
	// means the format changed and our regex silently matched almost nothing.
	if (Object.keys(map).length < 100) {
		throw new Error(
			`Parsed only ${Object.keys(map).length} tokens from ${relLabel} — the ` +
				"bundle format likely changed. Aborting to avoid shipping a broken variables.css.",
		);
	}
	return map;
}

/**
 * Normalize a token value for *comparison only* (never for output). Collapses
 * whitespace/case, canonicalizes numbers (`.875rem`→`0.875rem`, `1.0`→`1`) and
 * short hex colors (`#00c`→`#0000cc`) so purely cosmetic differences between our
 * files and the UI5 bundle are not mistaken for real customizations.
 * Conservative by design: it only merges values that are provably equivalent.
 */
function normalizeValue(value) {
	const s = String(value).trim().toLowerCase().replace(/\s+/g, " ");

	const numUnit = s.match(/^(-?\d*\.?\d+)([a-z%]*)$/);
	if (numUnit) {
		return `${Number.parseFloat(numUnit[1])}${numUnit[2]}`;
	}

	return s.replace(/#([0-9a-f]{3,4})\b/g, (_, hex) =>
		hex.length === 3 || hex.length === 4
			? `#${[...hex].map((ch) => ch + ch).join("")}`
			: `#${hex}`,
	);
}

/**
 * The set of tokens the stylesheet must carry. UI5 injects only its ACTIVE theme
 * (the default `sap_horizon`, i.e. light) globally on `:root`, so that is the one
 * — and only — baseline we can lean on. A token can therefore be omitted (left to
 * UI5) only when it equals UI5's stock light value in BOTH the light and the dark
 * theme; otherwise at least one theme needs to override it explicitly.
 *
 * Both `[data-theme]` blocks emit the SAME key set (each with its own theme's
 * value). That symmetry is what makes nested / sibling theming correct: entering
 * a `[data-theme]` subtree re-applies every non-constant token, so a dark panel
 * nested under a light one (or vice versa) never inherits the wrong value.
 */
function computeVaryingKeys(lightTokens, darkTokens, stockLight) {
	return Object.keys(lightTokens).filter((key) => {
		if (!(key in stockLight)) {
			return true;
		}
		const stock = normalizeValue(stockLight[key]);
		return (
			normalizeValue(lightTokens[key]) !== stock ||
			normalizeValue(darkTokens[key]) !== stock
		);
	});
}

// ── Component-scoped remaps ──────────────────────────────────────────────

/**
 * Static rules appended after the theme blocks, for tokens whose Reltio meaning
 * cannot be expressed by a value alone.
 *
 * `sapButton_BorderCornerRadius_Max` is a Reltio addition — the Hybrid Design
 * System binds the button's corner radius to it to get a pill, but UI5 buttons
 * only ever read `sapButton_BorderCornerRadius`. That token cannot simply be
 * re-valued: UI5 shares it with SegmentedButton, Token, Tag and the TabContainer
 * expand button, which the design keeps at their own smaller radii. Re-pointing
 * it on the button hosts confines the pill to buttons; custom properties inherit
 * through Shadow DOM, so the components' internals pick it up. The literal
 * fallback keeps buttons round when no `data-theme` ancestor is present.
 *
 * Popups are a second case. `base/PopupsCommon-parameters.css` derives
 * `--_ui5_popup_border_radius` from `sapElement_BorderCornerRadius`, but
 * `sap_horizon/PopupsCommon-parameters.css` overrides it with a hardcoded
 * `0.5rem` on `:host` — so neither `sapPopover_BorderCornerRadius` nor
 * `sapElement_BorderCornerRadius` reaches any popup. The internal variable has
 * to be set on the host element itself: a value inherited from an ancestor
 * loses to the shadow root's own `:host` rule, while a normal declaration from
 * the outer document beats it. Popover and Dialog carry different radii in the
 * design, hence two rules.
 *
 * `--_ui5_*` is UI5-private, so these two rules are the one place to re-check
 * on a UI5 upgrade. Popups nested inside another component's shadow root (e.g.
 * a Select's internal popover) are out of reach of a document-level selector
 * and keep UI5's default.
 */
const COMPONENT_REMAPS = [
	// The design binds the pill radius on the segmented button and its items too
	// — it ignores its own `sapButton_Segment_BorderCornerRadius` (8px) variable
	// and uses `_Max`, so follow the component, not the token.
	"ui5-button,",
	"ui5-toggle-button,",
	"ui5-segmented-button,",
	"ui5-segmented-button-item {",
	"\t--sapButton_BorderCornerRadius: var(--sapButton_BorderCornerRadius_Max, 2rem);",
	// The focus ring is a pseudo-element inset 1px with its OWN radius
	// (`0.375rem` in Horizon). Left alone it stays a small rounded rectangle
	// inside the pill, so its corners fall outside the button's curve and get
	// clipped. Both the outer ring and the inner one used by the Emphasized and
	// pressed states have to follow the pill.
	"\t--_ui5_button_focused_border_radius: var(--sapButton_BorderCornerRadius_Max, 2rem);",
	"\t--_ui5_button_focused_inner_border_radius: var(--sapButton_BorderCornerRadius_Max, 2rem);",
	// A segmented item's base radius comes from its own variable, and only the
	// group's first and last items get `sapButton_BorderCornerRadius` applied to
	// their OUTER corners. Pilling that token alone therefore left every item
	// with one squared-off end — 32/8/8/32 on the first, 8px all round in the
	// middle. The design draws the group as one pill outline with the SELECTED
	// item as a complete pill inside it, so the base radius has to be the pill
	// too. Unselected items carry no fill or border, so nothing else changes
	// visually.
	"\t--sapButton_Segment_BorderCornerRadius: var(--sapButton_BorderCornerRadius_Max, 2rem);",
	"}",
	"",
	"ui5-popover,",
	"ui5-responsive-popover {",
	"\t--_ui5_popup_border_radius: var(--sapPopover_BorderCornerRadius, 1rem);",
	"}",
	"",
	"ui5-dialog {",
	"\t--_ui5_popup_border_radius: var(--sapElement_BorderCornerRadius, 1.5rem);",
	"}",
].join("\n");

// ── CSS generator ────────────────────────────────────────────────────────

function generateVariablesCss({ lightTokens, darkTokens, stockLight }) {
	const keys = computeVaryingKeys(lightTokens, darkTokens, stockLight);
	const lightDecls = keys.map((key) => `\t--${key}: ${lightTokens[key]};`);
	const darkDecls = keys.map((key) => `\t--${key}: ${darkTokens[key]};`);

	const sections = [
		`${themeSelector("light")} {\n${lightDecls.join("\n")}\n}`,
		`${themeSelector("dark")} {\n${darkDecls.join("\n")}\n}`,
		COMPONENT_REMAPS,
	];

	const css = `${autoGeneratedHeader([LIGHT_REL, DARK_REL])}\n${sections.join("\n\n")}\n`;
	return { css, count: keys.length };
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
	const lightTokens = (await readTokensJson(LIGHT_JSON, LIGHT_REL)).root;
	const darkTokens = (await readTokensJson(DARK_JSON, DARK_REL)).root;

	const stockLight = await loadStockBundle(LIGHT_BUNDLE, LIGHT_BUNDLE_REL);

	const { css, count } = generateVariablesCss({
		lightTokens,
		darkTokens,
		stockLight,
	});

	await writeFile(join(PUBLIC_DIR, "variables.css"), css);

	console.log(
		"Generated:\n" +
			`  public/variables.css (${count} tokens per theme; tokens identical to UI5's ` +
			"stock light theme in both themes are omitted and inherited from UI5 at runtime)",
	);
}

main().catch((err) => {
	console.error(err.message ?? err);
	process.exit(1);
});
