#!/usr/bin/env node
/**
 * Reltio Design Platform — token generator.
 *
 * Reads the verbatim SAP Horizon source files committed in tokens/ and emits:
 *   - public/themes/horizon-light.theme.css   (1 :root block, ~1536 vars)
 *   - public/themes/horizon-dark.theme.css    (1 :root block, ~1536 vars)
 *   - public/fonts.css                        (20 @font-face rules)
 *   - tokens/token-data.ts                    (per-category typed token arrays)
 *   - tokens/Tokens.stories.tsx               (Storybook stories — one per
 *                                              conceptual category; docs page
 *                                              is the hand-written Tokens.story.mdx)
 *
 * No filtering, no value transformation. Every key from the SAP JSON becomes a
 * CSS custom property `--<key>: <value>;`.
 *
 * Sync upstream: see tokens/README.md.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// ── Paths ────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dirname, "..");
const TOKENS_DIR = join(ROOT, "tokens");
const PUBLIC_DIR = join(ROOT, "public");
const THEMES_DIR = join(PUBLIC_DIR, "themes");

// ── Font configuration ───────────────────────────────────────────────────

const FONT_CDN_BASE = "https://reltio.design/fonts";

// [font-family, font-weight, font-style, file basename]
// Two @font-face rules per row (Latin subset + extended -full subset) → 20 rules.
const FONT_FACES = [
	["72", 300, "normal", "72-Light"],
	["72", 400, "normal", "72-Regular"],
	["72", 400, "italic", "72-Italic"],
	["72", 600, "normal", "72-Semibold"],
	["72-SemiboldDuplex", 400, "normal", "72-SemiboldDuplex"],
	["72", 700, "normal", "72-Bold"],
	["72", 700, "italic", "72-BoldItalic"],
	["72", 900, "normal", "72-Black"],
	["72 Mono", 400, "normal", "72Mono-Regular"],
	["72 Mono", 700, "normal", "72Mono-Bold"],
];

const LATIN_RANGE =
	"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+2215, U+FEFF, U+FFFD";
const FULL_RANGE = "U+0100-FFFF";

// ── Token categories (Storybook sidebar order) ───────────────────────────
//
// Each entry maps a Story export name to the set of SAP-native prefix groups
// that belong in it. The prefix groups are what `deriveGroup()` returns.
// Order matters: stories appear in the sidebar in this order.
//
// `description` is surfaced by Storybook MCP as the story description —
// write it for AI agents: include key token names and CSS usage.

const CATEGORIES = [
	{
		export: "Brand",
		title: "Brand",
		description: [
			"Brand surface, accent palette, and highlight colors — the primary identity layer of the UI.",
			"",
			"Key tokens:",
			"- `--sapBrandColor` — primary brand identity, main CTAs and primary actions",
			"- `--sapHighlightColor` — selection and focus highlight",
			"- `--sapHighlightTextColor` — text on highlighted backgrounds",
			"- `--sapAccentColor1..10` — 10 distinct accent hues for categorical data (charts, tags, avatars)",
			"- `--sapAccentBackgroundColor1..10` — lighter tinted backgrounds pairing with each AccentColor",
			"",
			"CSS: `color: var(--sapBrandColor)` · `background: var(--sapAccentBackgroundColor1)`",
		].join("\n"),
		groups: ["Brand", "Accent", "Highlight"],
	},
	{
		export: "Semantic",
		title: "Semantic",
		description: [
			"Status and feedback colors — success, error, warning, information, neutral, plus indication scales.",
			"",
			"Key tokens (each semantic state has a Color + Background + BorderColor triplet):",
			"- `--sapSuccessColor` / `Background` / `BorderColor` — positive outcome",
			"- `--sapErrorColor` / `Background` / `BorderColor` — error or failure",
			"- `--sapWarningColor` / `Background` / `BorderColor` — caution",
			"- `--sapInformationColor` / `Background` / `BorderColor` — informational",
			"- `--sapNeutralColor` — neutral, non-semantic state",
			"- `--sapPositiveColor`, `--sapNegativeColor`, `--sapCriticalColor`, `--sapInformativeColor` — state variants with matching `*ElementColor` and `*TextColor`",
			"- `--sapIndicationColor_1..10` — extended 10-step indication palette, each with `_Background`, `_BorderColor`, `_TextColor`, `_Hover_Background`, `_Active_Background`",
			"",
			"CSS: `color: var(--sapErrorColor)` · `background: var(--sapErrorBackground)` · `border-color: var(--sapErrorBorderColor)`",
		].join("\n"),
		groups: [
			"Success",
			"Error",
			"Warning",
			"Information",
			"Informative",
			"Critical",
			"Positive",
			"Negative",
			"Neutral",
			"Indication",
			"Message",
		],
	},
	{
		export: "Surface",
		title: "Surface",
		description: [
			"Backgrounds, page surfaces, shells, panels, and structural containers.",
			"",
			"Key tokens:",
			"- `--sapBackgroundColor` — default page background",
			"- `--sapBaseColor` — base surface for cards and controls",
			"- `--sapShell_Background` — app shell / header background",
			"- `--sapPageHeader_Background` / `--sapPageFooter_Background` — page header and footer",
			"- `--sapGroup_ContentBackground` — content group background",
			"- `--sapTile_Background` — tile / card surface",
			"- `--sapObjectHeader_Background` — object page header",
			"- `--sapToolbar_Background` — toolbar surface",
			"- `--sapInfobar_Background` — info bar background",
			"- `--sapBlockLayer_Background` — modal overlay layer",
			"",
			"CSS: `background: var(--sapBackgroundColor)` · `background: var(--sapShell_Background)`",
		].join("\n"),
		groups: [
			"Background",
			"Base",
			"Block",
			"Page",
			"Group",
			"Shell",
			"Tile",
			"Object",
			"Popover",
			"Infobar",
			"Toolbar",
		],
	},
	{
		export: "Interaction",
		title: "Interaction",
		description: [
			"Hover, active, and selected interaction-state colors applied across components.",
			"",
			"Key tokens:",
			"- `--sapHoverColor` — universal hover background",
			"- `--sapActiveColor` — universal active / pressed background",
			"- `--sapSelectedColor` — universal selected background",
			"",
			"These are base tokens. Component-specific interaction states (e.g. `--sapButton_Hover_Background`, `--sapList_Hover_Background`) are in their respective categories (Form Controls, etc.).",
			"",
			"CSS: `background: var(--sapHoverColor)` · `background: var(--sapSelectedColor)`",
		].join("\n"),
		groups: ["Hover", "Active", "Selected"],
	},
	{
		export: "Text",
		title: "Text & Links",
		description: [
			"Body text, titles, and link colors — including hover/visited states.",
			"",
			"Key tokens:",
			"- `--sapTextColor` — default body text",
			"- `--sapTitleColor` — headings",
			"- `--sapLinkColor` — interactive link text",
			"- `--sapLink_Hover_Color` — link hover",
			"- `--sapLink_Visited_Color` — visited link",
			"- `--sapLink_Active_Color` — link pressed state",
			"- `--sapLink_SubtleColor` — de-emphasized link",
			"- `--sapLink_InvertedColor` — link on dark backgrounds",
			"",
			"CSS: `color: var(--sapTextColor)` · `color: var(--sapLinkColor)`",
		].join("\n"),
		groups: ["Text", "Title", "Link"],
	},
	{
		export: "Typography",
		title: "Typography",
		description: [
			"Font families, sizes, weights, and the SAP 72 type-scale.",
			"",
			"Key tokens:",
			'- `--sapFontFamily` — default font stack ("72", "72full", Arial, Helvetica, sans-serif)',
			"- `--sapFontSize` — base font size (0.875rem)",
			"- `--sapFontLargeSize` / `--sapFontSmallSize` — large and small text",
			"- `--sapFontHeader1Size`..`6Size` — heading scale (H1 through H6)",
			"- `--sapFontBoldWeight` — bold weight value",
			"- `--sapFontHeaderFamily` — header-specific font family",
			'- `--sapFontMonoFamily` — monospace font ("72Mono")',
			"",
			"CSS: `font-family: var(--sapFontFamily)` · `font-size: var(--sapFontHeader1Size)`",
		].join("\n"),
		groups: ["Font"],
	},
	{
		export: "Layout",
		title: "Layout & Sizing",
		description: [
			"Element heights, border radii, breakpoints, and scrollbar sizing.",
			"",
			"Key tokens:",
			"- `--sapElement_Height` — default control height (2.75rem / 44px)",
			"- `--sapElement_Compact_Height` — compact mode height (2rem / 32px)",
			"- `--sapElement_Condensed_Height` — condensed height (1.5rem / 24px)",
			"- `--sapElement_BorderCornerRadius` — default border radius (0.75rem / 12px)",
			"- `--sapElement_BorderWidth` — default border width (0.0625rem / 1px)",
			"- `--sapBreakpoint_S_Min` / `M_Min` / `L_Min` / `XL_Min` — responsive breakpoints",
			"- `--sapScrollBar_Dimension` — scrollbar size",
			"",
			"CSS: `height: var(--sapElement_Height)` · `border-radius: var(--sapElement_BorderCornerRadius)`",
		].join("\n"),
		groups: ["Element", "Breakpoint", "Scroll"],
	},
	{
		export: "Content",
		title: "Content & Icons",
		description: [
			"Content-area tokens — labels, icons, focus rings, shadows, and foreground details.",
			"",
			"Key tokens:",
			"- `--sapContent_LabelColor` — label / secondary text color",
			"- `--sapContent_IconColor` — default icon color",
			"- `--sapContent_FocusColor` — focus ring color",
			"- `--sapContent_FocusWidth` — focus ring width",
			"- `--sapContent_FocusStyle` — focus ring style (e.g. dotted, solid)",
			"- `--sapContent_Shadow0`..`3` — four elevation levels as full `box-shadow` strings",
			"- `--sapContent_ForegroundColor` — default foreground",
			"- `--sapContent_BadgeBackground` — badge / counter background",
			"- `--sapContent_ImagePlaceholderBackground` — image placeholder",
			"",
			"CSS: `color: var(--sapContent_LabelColor)` · `box-shadow: var(--sapContent_Shadow1)`",
		].join("\n"),
		groups: ["Content", "Favicon"],
	},
	{
		export: "Chart",
		title: "Charts & Data Viz",
		description: [
			"Categorical and sequential chart palettes plus legend-marker colors.",
			"",
			"Key tokens:",
			"- `--sapChart_OrderedColor_1..12` — 12-step categorical chart palette",
			"- `--sapChart_Background` — chart canvas background",
			"- `--sapChart_ReferenceLineColor` — reference / threshold lines",
			"- `--sapChart_Good` / `--sapChart_Bad` / `--sapChart_Critical` — semantic chart colors",
			"- `--sapChart_Sequence_1..12` — sequential palette variants with `_BorderColor`",
			"- `--sapLegendColor1..20` — legend marker foreground colors",
			"- `--sapLegendBackgroundColor1..20` — legend marker backgrounds",
			"",
			"CSS: `fill: var(--sapChart_OrderedColor_1)` · `background: var(--sapChart_Background)`",
		].join("\n"),
		groups: ["Chart", "Legend"],
	},
	{
		export: "FormControls",
		title: "Form Controls",
		description: [
			"Component-specific tokens for form fields, buttons, tabs, sliders, and lists.",
			"",
			"Key tokens:",
			"- `--sapField_Background` / `--sapField_BorderColor` — input field surface and border",
			"- `--sapField_Hover_Background` / `--sapField_Focus_Background` — field interaction states",
			"- `--sapField_InvalidColor` / `--sapField_WarningColor` / `--sapField_SuccessColor` — validation state colors",
			"- `--sapButton_Background` / `--sapButton_BorderColor` — default button",
			"- `--sapButton_Emphasized_Background` — primary / CTA button",
			"- `--sapButton_Hover_Background` / `--sapButton_Active_Background` — button states",
			"- `--sapList_Background` / `--sapList_BorderColor` — list surface",
			"- `--sapList_Hover_Background` / `--sapList_Active_Background` — list item states",
			"- `--sapTab_Background` / `--sapTab_Selected_Background` — tab bar",
			"",
			"CSS: `background: var(--sapField_Background)` · `border-color: var(--sapField_BorderColor)`",
		].join("\n"),
		groups: ["Field", "Button", "Tab", "Slider", "List"],
	},
	{
		export: "Avatar",
		title: "Avatars & Assistant",
		description: [
			"Avatar palette and AI assistant component-specific tokens.",
			"",
			"Key tokens:",
			"- `--sapAvatar_1..10_Background` / `_BorderColor` / `_TextColor` — 10 avatar color presets",
			"- `--sapAvatar_1..10_Hover_Background` — avatar hover states",
			"- `--sapAssistant_Background` — AI assistant surface",
			"- `--sapAssistant_BorderColor` / `--sapAssistant_TextColor` — assistant styling",
			"- `--sapAssistant_Hover_Background` / `--sapAssistant_Active_Background` — assistant interaction states",
			"- `--sapAssistant_Answer_Background` — answer bubble surface",
			"",
			"CSS: `background: var(--sapAvatar_1_Background)` · `color: var(--sapAvatar_1_TextColor)`",
		].join("\n"),
		groups: ["Avatar", "Assistant"],
	},
	{
		export: "Misc",
		title: "Miscellaneous",
		description: [
			"Company logo, theme identifier, progress indicators, and other ungrouped tokens.",
			"",
			"Key tokens:",
			"- `--sapCompanyLogo` — company logo reference",
			"- `--sapSapThemeId` — theme identifier string",
			"- `--sapProgress_Background` / `--sapProgress_BorderColor` — progress bar base",
			"- `--sapProgress_PositiveBackground` / `NegativeBackground` / `CriticalBackground` — progress semantic states",
			"- `--sapProgress_FontSize` / `--sapProgress_TextColor` — progress label styling",
			"",
			"CSS: `background: var(--sapProgress_Background)` · `border-color: var(--sapProgress_BorderColor)`",
		].join("\n"),
		groups: ["Company", "Sap", "Progress"],
	},
];

// ── Utilities ────────────────────────────────────────────────────────────

function autoGeneratedHeader(sources) {
	return [
		"/**",
		" * Auto-generated by scripts/build-tokens.mjs — do not edit manually.",
		" * Run: npm run build-tokens",
		` * Source: ${sources.join(", ")}`,
		" */",
		"",
	].join("\n");
}

/** First capitalised word after "sap" → token group name. */
function deriveGroup(key) {
	if (!key.startsWith("sap")) return "Other";
	const tail = key.slice(3);
	const m = tail.match(/^([A-Z][a-z]+)/);
	return m ? m[1] : tail;
}

/** Escape for use inside a double-quoted string in generated TSX. */
function escapeForTsx(s) {
	return s
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\r/g, "\\r")
		.replace(/\n/g, "\\n");
}

/** "Brand" → "brandTokens", "FormControls" → "formControlsTokens" */
function categoryDataExport(exportName) {
	return exportName.charAt(0).toLowerCase() + exportName.slice(1) + "Tokens";
}

// ── CSS generators ───────────────────────────────────────────────────────

function generateThemeCss(tokens, sourceFile) {
	const vars = Object.entries(tokens).map(
		([key, value]) => `\t--${key}: ${value};`,
	);
	return `${autoGeneratedHeader([sourceFile])}\n:root {\n${vars.join("\n")}\n}\n`;
}

function generateFontsCss() {
	const subsets = [
		{ suffix: "", range: LATIN_RANGE },
		{ suffix: "-full", range: FULL_RANGE },
	];

	const rules = [];
	for (const [family, weight, style, basename] of FONT_FACES) {
		for (const { suffix, range } of subsets) {
			const file = `${basename}${suffix}.woff2`;
			rules.push(
				[
					"@font-face {",
					`\tfont-family: "${family}";`,
					`\tfont-style: ${style};`,
					`\tfont-weight: ${weight};`,
					"\tfont-display: swap;",
					`\tsrc: url("${FONT_CDN_BASE}/${file}") format("woff2");`,
					`\tunicode-range: ${range};`,
					"}",
				].join("\n"),
			);
		}
	}

	return `${autoGeneratedHeader(["FONT_FACES table in scripts/build-tokens.mjs"])}\n${rules.join("\n\n")}\n`;
}

// ── Token data generator ─────────────────────────────────────────────────

function generateTokenDataFile(byCategory) {
	const blocks = CATEGORIES.map((cat) => {
		const varName = categoryDataExport(cat.export);
		const entries = byCategory.get(cat.export);
		const rows = entries
			.map(
				({ name, light, dark }) =>
					`\t{ name: "${escapeForTsx(name)}", light: "${escapeForTsx(light)}", dark: "${escapeForTsx(dark)}" },`,
			)
			.join("\n");
		return `export const ${varName}: Token[] = [\n${rows}\n];`;
	});

	return [
		"// Auto-generated by scripts/build-tokens.mjs — do not edit by hand.",
		"// Run: npm run build-tokens",
		"// Source: tokens/sap_horizon.tokens.json, tokens/sap_horizon_dark.tokens.json",
		"",
		'import type { Token } from "./DesignTokens";',
		"",
		blocks.join("\n\n"),
		"",
	].join("\n");
}

// ── Stories generator ────────────────────────────────────────────────────

function groupTokensByCategory(lightTokens, darkTokens) {
	// Group tokens by derived prefix
	const byGroup = new Map();
	for (const [name, light] of Object.entries(lightTokens)) {
		const dark = darkTokens[name] ?? light;
		const group = deriveGroup(name);
		if (!byGroup.has(group)) byGroup.set(group, []);
		byGroup.get(group).push({ name, light, dark });
	}

	// Map each group to a category
	const groupToCategory = new Map();
	for (const cat of CATEGORIES) {
		for (const g of cat.groups) {
			if (groupToCategory.has(g)) {
				throw new Error(
					`Group "${g}" is mapped to both "${groupToCategory.get(g)}" and "${cat.export}" — fix CATEGORIES.`,
				);
			}
			groupToCategory.set(g, cat.export);
		}
	}

	// Every group must belong to a category
	const orphans = [...byGroup.keys()].filter((g) => !groupToCategory.has(g));
	if (orphans.length > 0) {
		throw new Error(
			`Unmapped token group(s): ${orphans.join(", ")}. Add them to CATEGORIES in scripts/build-tokens.mjs.`,
		);
	}

	// Assemble per-category token lists, sorted alphabetically
	const byCategory = new Map(CATEGORIES.map((c) => [c.export, []]));
	for (const [group, entries] of byGroup) {
		byCategory.get(groupToCategory.get(group)).push(...entries);
	}
	for (const list of byCategory.values()) {
		list.sort((a, b) => a.name.localeCompare(b.name));
	}

	return {
		byCategory,
		totalCount: Object.keys(lightTokens).length,
		categoryCount: CATEGORIES.length,
		groupCount: byGroup.size,
	};
}

function generateStoryExport(cat) {
	const varName = categoryDataExport(cat.export);

	return [
		`export const ${cat.export}: Story = {`,
		`\tname: "${escapeForTsx(cat.title)}",`,
		"\tparameters: {",
		"\t\tdocs: {",
		`\t\t\tdescription: { story: "${escapeForTsx(cat.description)}" },`,
		"\t\t},",
		"\t},",
		`\targs: { tokens: ${varName} },`,
		"};",
	].join("\n");
}

function generateStoriesFile() {
	const storyBlocks = CATEGORIES.map((cat) => generateStoryExport(cat)).join(
		"\n\n",
	);

	const dataImports = CATEGORIES.map((cat) =>
		categoryDataExport(cat.export),
	).join(", ");

	// Docs page is the hand-written Tokens.story.mdx — keep meta minimal.
	return [
		"// Auto-generated by scripts/build-tokens.mjs — do not edit by hand.",
		"// Run: npm run build-tokens",
		"// Source: tokens/sap_horizon.tokens.json, tokens/sap_horizon_dark.tokens.json",
		"",
		'import type { Meta, StoryObj } from "@storybook/react-vite";',
		'import { DesignTokens } from "./DesignTokens";',
		`import { ${dataImports} } from "./token-data";`,
		"",
		"const meta = {",
		'\ttitle: "Design Tokens",',
		"\tcomponent: DesignTokens,",
		"\tparameters: {",
		'\t\tlayout: "padded",',
		"\t},",
		"} satisfies Meta<typeof DesignTokens>;",
		"",
		"export default meta;",
		"type Story = StoryObj<typeof meta>;",
		"",
		storyBlocks,
		"",
	].join("\n");
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
	await mkdir(THEMES_DIR, { recursive: true });

	const lightTokens = JSON.parse(
		await readFile(join(TOKENS_DIR, "sap_horizon.tokens.json"), "utf8"),
	).root;
	const darkTokens = JSON.parse(
		await readFile(join(TOKENS_DIR, "sap_horizon_dark.tokens.json"), "utf8"),
	).root;

	const { byCategory } = groupTokensByCategory(lightTokens, darkTokens);

	const lightCss = generateThemeCss(
		lightTokens,
		"tokens/sap_horizon.tokens.json",
	);
	const darkCss = generateThemeCss(
		darkTokens,
		"tokens/sap_horizon_dark.tokens.json",
	);
	const fontsCss = generateFontsCss();
	const tokenDataTs = generateTokenDataFile(byCategory);
	const storiesTsx = generateStoriesFile();

	await Promise.all([
		writeFile(join(THEMES_DIR, "horizon-light.theme.css"), lightCss),
		writeFile(join(THEMES_DIR, "horizon-dark.theme.css"), darkCss),
		writeFile(join(PUBLIC_DIR, "fonts.css"), fontsCss),
		writeFile(join(TOKENS_DIR, "token-data.ts"), tokenDataTs),
		writeFile(join(TOKENS_DIR, "Tokens.stories.tsx"), storiesTsx),
	]);

	const lightCount = (lightCss.match(/^\t--sap/gm) || []).length;
	const darkCount = (darkCss.match(/^\t--sap/gm) || []).length;
	const faceCount = (fontsCss.match(/@font-face/g) || []).length;
	const storyCount = (storiesTsx.match(/^export const \w+: Story = /gm) || [])
		.length;
	const dataExportCount = (tokenDataTs.match(/^export const /gm) || []).length;

	console.log(
		`Generated:\n  public/themes/horizon-light.theme.css (${lightCount} tokens)\n  public/themes/horizon-dark.theme.css (${darkCount} tokens)\n  public/fonts.css (${faceCount} @font-face rules)\n  tokens/token-data.ts (${dataExportCount} exports, ${lightCount} tokens)\n  tokens/Tokens.stories.tsx (${storyCount} stories)`,
	);
}

main().catch(console.error);
