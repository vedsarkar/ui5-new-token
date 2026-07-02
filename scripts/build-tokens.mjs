#!/usr/bin/env node
/**
 * Reltio Design Platform — design-token CSS generator.
 *
 * Reads SAP Horizon design tokens from the repo-local token files
 * (`utils/sap_horizon.tokens.json`, `utils/sap_horizon_dark.tokens.json`) and
 * emits `public/variables.css` — but ONLY the tokens whose value differs from
 * the stock SAP Horizon theme. The rest are left to UI5.
 *
 * ── Why we emit only the deltas ────────────────────────────────────────────
 * The UI5 web components ship their own copy of the stock SAP Horizon theme and
 * inject it at runtime as a *constructable* stylesheet appended to
 * `document.adoptedStyleSheets` (see `@ui5/webcomponents-base` → `applyTheme` /
 * `ManagedStyles`). That sheet puts the FULL upstream token set on `:root`
 * (`:root { --sapBrandColor: #0070f2; … }`). So the stock values are already in
 * the document — there is no point shipping them again. `variables.css` only
 * needs to carry the tokens Reltio actually re-values; everything else inherits
 * UI5's defaults, and tracks UI5 automatically when it upgrades.
 *
 * The "custom" set is computed at build time by diffing our token files against
 * UI5's injected bundles (`@ui5/webcomponents-theming/.../parameters-bundle.css.json`
 * for `sap_horizon` and `sap_horizon_dark`). A token is emitted when it is absent
 * from the bundle, or when its value differs after formatting normalization
 * (so `1.0` vs `1` or `#00c` vs `#0000cc` are NOT treated as customizations).
 * The comparison is deliberately conservative: emitting a redundant override is
 * harmless, silently dropping a real one is not.
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
const DARK_BUNDLE_REL = `${UI5_THEMES_REL}/sap_horizon_dark/parameters-bundle.css.json`;
const LIGHT_BUNDLE = join(ROOT, LIGHT_BUNDLE_REL);
const DARK_BUNDLE = join(ROOT, DARK_BUNDLE_REL);

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
 * A token is a Reltio customization for a theme when it is absent from the stock
 * bundle, or its (normalized) value differs from the stock value.
 */
function isCustomization(key, ourTokens, stockMap) {
	if (!(key in stockMap)) {
		return true;
	}
	return normalizeValue(ourTokens[key]) !== normalizeValue(stockMap[key]);
}

// ── CSS generator ────────────────────────────────────────────────────────

function themeDeclarations(ourTokens, stockMap) {
	return Object.keys(ourTokens)
		.filter((key) => isCustomization(key, ourTokens, stockMap))
		.map((key) => `\t--${key}: ${ourTokens[key]};`);
}

function generateVariablesCss({
	lightTokens,
	darkTokens,
	stockLight,
	stockDark,
}) {
	const lightDecls = themeDeclarations(lightTokens, stockLight);
	const darkDecls = themeDeclarations(darkTokens, stockDark);

	const sections = [
		`${themeSelector("light")} {\n${lightDecls.join("\n")}\n}`,
		`${themeSelector("dark")} {\n${darkDecls.join("\n")}\n}`,
	];

	const css = `${autoGeneratedHeader([LIGHT_REL, DARK_REL])}\n${sections.join("\n\n")}\n`;
	return { css, lightCount: lightDecls.length, darkCount: darkDecls.length };
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
	const lightTokens = (await readTokensJson(LIGHT_JSON, LIGHT_REL)).root;
	const darkTokens = (await readTokensJson(DARK_JSON, DARK_REL)).root;

	const stockLight = await loadStockBundle(LIGHT_BUNDLE, LIGHT_BUNDLE_REL);
	const stockDark = await loadStockBundle(DARK_BUNDLE, DARK_BUNDLE_REL);

	const { css, lightCount, darkCount } = generateVariablesCss({
		lightTokens,
		darkTokens,
		stockLight,
		stockDark,
	});

	await writeFile(join(PUBLIC_DIR, "variables.css"), css);

	console.log(
		"Generated:\n" +
			`  public/variables.css (Reltio deltas only — ${lightCount} light, ${darkCount} dark; ` +
			"stock values come from UI5 at runtime)",
	);
}

main().catch((err) => {
	console.error(err.message ?? err);
	process.exit(1);
});
