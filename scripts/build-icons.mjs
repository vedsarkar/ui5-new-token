#!/usr/bin/env node
/**
 * Reltio Design Platform — custom icon registration generator.
 *
 * Reads every SVG in the flat `public/icons/` folder and registers it into UI5's
 * global icon registry under the single `reltio` collection. Each icon is then
 * referenced by `reltio/<file-name>` (the file name is the icon name):
 *
 *   public/icons/data-quality.svg -> <Icon name="reltio/data-quality" />
 *
 * Per-icon modules publish at `@reltio/design/icons/reltio/<kebab-name>`.
 *
 * The same name works in any UI5 `icon` prop (Button, SideNavigationItem, …).
 *
 * `public/icons/` is a public URL surface: the files are served verbatim (e.g.
 * `https://reltio.design/icons/data-quality.svg`), so file names must be
 * lowercase, kebab-case, URL-safe. The icon name mirrors the file name exactly.
 * To guarantee this, the script first renames any non-kebab-case SVG on disk to
 * its kebab-case form (`My Icon.svg` -> `my-icon.svg`) — file, public URL, and
 * registry name stay in sync, and the corrected file is what gets committed.
 *
 * The script also emits a single Storybook gallery story, `Icons/Reltio Icons`,
 * that renders every icon through the UI5 Icon component.
 *
 * Why `unsafeRegisterIcon` + `customTemplateAsString` (not `pathData`):
 * the Figma exports mix `<path>`, `<rect>`, `<mask>`, and `<clipPath>` and rely
 * on `fill-rule="evenodd"`. UI5's `pathData` path only renders bare `<path d>`
 * elements with the default fill-rule, which would drop shapes and fill holes.
 * Registering the full (sanitized) inner SVG markup preserves fidelity.
 *
 * Theming: UI5's `ui5-icon` host sets `fill: currentColor`, so we map the ink
 * fills AND strokes (`#0E0E25`, `black`) to `currentColor` — the icons inherit
 * `--sapContent_IconColor`, honor `<Icon design="…">`, and re-tint in dark
 * theme. Non-ink fills inside `<mask>` / `<clipPath>` (`#D9D9D9`, `white`) are
 * kept verbatim because they define the mask/clip, not visible ink.
 *
 * To add or update icons: drop SVGs into `public/icons/` (any file name), then
 * re-run this script (`npm run build-icons`) — it normalizes the file names and
 * regenerates the registry. Commit the renamed SVGs and the generated dir.
 */

import { spawnSync } from "node:child_process";
import {
	mkdir,
	readdir,
	readFile,
	rename,
	rm,
	writeFile,
} from "node:fs/promises";
import { join, resolve } from "node:path";
import {
	reltioComponentExportName,
	renderCustomIconModule,
} from "./icon-module-codegen.mjs";

// ── Paths ────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dirname, "..");
const ICONS_DIR = join(ROOT, "public/icons");
const ICONS_REL = "public/icons";
const OUT_DIR = join(ROOT, "icons/reltio");
const OUT_REL = "icons/reltio";
/** Parent folder for gallery + catalog stories (hand-written `icons.story.mdx` lives here too). */
const PARENT_DIR = join(ROOT, "icons");
/** Import specifier for `.storybook/preview` from a story inside OUT_DIR. */
const PREVIEW_IMPORT = "../.storybook/preview";
/** UI5 icon-collection prefix for every Reltio icon. */
const COLLECTION = "reltio";
/** Storybook title prefix for the per-icon showcase stories. */
const CATALOG_PREFIX = "Icons/Reltio Icons Catalog";

/** Fill/stroke values that represent the monochrome "ink" of an icon. Mapped to
 * `currentColor` so the icon is theme-aware. */
const INK_COLORS = new Set(["#0e0e25", "#000000", "#000", "black"]);

// ── Helpers ────────────────────────────────────────────────────────────────

/** `Data quality-1.svg` -> `data-quality-1`. */
function toSlug(value) {
	return value
		.replace(/\.svg$/i, "")
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function extractViewBox(svg) {
	const viewBox = svg.match(/<svg[^>]*\sviewBox="([^"]+)"/i);
	if (viewBox) {
		return viewBox[1].trim();
	}
	const width = svg.match(/<svg[^>]*\swidth="([\d.]+)"/i);
	const height = svg.match(/<svg[^>]*\sheight="([\d.]+)"/i);
	if (width && height) {
		return `0 0 ${width[1]} ${height[1]}`;
	}
	return "0 0 24 24";
}

/** Strip the opening `<svg …>` and closing `</svg>` wrapper. */
function extractInner(svg) {
	return svg
		.replace(/^[\s\S]*?<svg[^>]*>/i, "")
		.replace(/<\/svg>\s*$/i, "")
		.trim();
}

/** Read the root `<svg>` `fill` attribute (Figma exports default it to "none"). */
function extractRootFill(svg) {
	const match = svg.match(/<svg[^>]*\sfill="([^"]+)"/i);
	return match ? match[1].trim() : undefined;
}

/**
 * Turn raw Figma SVG inner-markup into safe, theme-aware markup:
 *  - drop comments, `<script>`, and inline event handlers (XSS hardening),
 *  - map ink fills AND strokes to `currentColor` so the icon inherits
 *    `--sapContent_IconColor` and honors `design`/`color`,
 *  - re-wrap in a `<g>` carrying the original root `fill` (usually `none`), so
 *    stroke-only shapes are not force-filled once the `<svg>` wrapper is dropped,
 *  - namespace all `id`s and their references with the icon name so two icons
 *    rendered on the same page can never collide on `mask`/`clipPath` ids.
 */
function sanitize(inner, name, rootFill) {
	let out = inner
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/\son[a-z]+="[^"]*"/gi, "");

	out = out
		.replace(/\sfill=(["'])([^"']*)\1/gi, (match, _quote, value) =>
			INK_COLORS.has(value.trim().toLowerCase())
				? ' fill="currentColor"'
				: match,
		)
		.replace(/\sstroke=(["'])([^"']*)\1/gi, (match, _quote, value) =>
			INK_COLORS.has(value.trim().toLowerCase())
				? ' stroke="currentColor"'
				: match,
		);

	const prefix = `${name}-`;
	out = out
		.replace(/\bid="([^"]+)"/g, (_m, id) => `id="${prefix}${id}"`)
		.replace(/url\(#([^)]+)\)/g, (_m, id) => `url(#${prefix}${id})`)
		.replace(
			/\b(xlink:href|href)="#([^"]+)"/g,
			(_m, attr, id) => `${attr}="#${prefix}${id}"`,
		);

	out = out.replace(/\s+/g, " ").trim();

	return rootFill ? `<g fill="${rootFill}">${out}</g>` : out;
}

// ── File-name normalization ─────────────────────────────────────────────────

/**
 * Renames every SVG in `public/icons/` to its kebab-case form so the public
 * file name (and thus its served URL) always matches its registry name. Throws
 * on a collision before touching any file. Returns the list of renames done.
 */
async function normalizeFileNames() {
	const files = (await readdir(ICONS_DIR, { withFileTypes: true }))
		.filter(
			(entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".svg"),
		)
		.map((entry) => entry.name);

	// Map desired kebab name -> original, detecting collisions up front.
	const desiredToOriginal = new Map();
	for (const original of files) {
		const desired = `${toSlug(original)}.svg`;
		const clash = desiredToOriginal.get(desired);
		if (clash && clash !== original) {
			throw new Error(
				`Name collision: "${original}" and "${clash}" both normalize to "${desired}".`,
			);
		}
		desiredToOriginal.set(desired, original);
	}

	const renames = [];
	for (const [desired, original] of desiredToOriginal) {
		if (desired !== original) {
			await rename(join(ICONS_DIR, original), join(ICONS_DIR, desired));
			renames.push(`${original} -> ${desired}`);
		}
	}
	return renames;
}

// ── Code generation ────────────────────────────────────────────────────────

function header(extraLines = []) {
	return [
		"/**",
		" * Auto-generated by scripts/build-icons.mjs — do not edit manually.",
		" * Run: npm run build-icons",
		` * Source: ${ICONS_REL}/*.svg`,
		...extraLines.map((line) => ` * ${line}`),
		" */",
		"",
	].join("\n");
}

/** Per-icon module: registration + PascalCase component export. */
function renderIconModule(icon) {
	return renderCustomIconModule({
		kebabName: icon.name,
		collection: COLLECTION,
		viewBox: icon.viewBox,
		svg: icon.svg,
	});
}

/** Aggregate entry (`@reltio/design/icons/reltio`): side-effect-imports every per-icon
 * module (registers the whole set) and re-exports lightweight metadata. */
function renderIndexModule(icons) {
	const sideEffectImports = icons
		.map((icon) => `import "./${icon.name}";`)
		.join("\n");

	const metaLiteral = icons
		.map(
			(icon) =>
				`\t{ name: ${JSON.stringify(icon.name)}, viewBox: ${JSON.stringify(icon.viewBox)} },`,
		)
		.join("\n");

	return `${header([
		"Importing this module registers EVERY Reltio icon into UI5's global icon",
		'registry, e.g. <Icon name="reltio/data-quality" />. To register only one',
		'icon (tree-shakable), import "@reltio/design/icons/reltio/<name>" instead.',
	])}${sideEffectImports}

/** UI5 icon-collection prefix for every Reltio icon. */
export const RELTIO_ICON_COLLECTION = ${JSON.stringify(COLLECTION)};

export type ReltioIcon = {
	/** Icon name. Render as <Icon name={\`reltio/\${name}\`} />. */
	name: string;
	/** The icon's SVG viewBox. */
	viewBox: string;
};

/** Metadata for every Reltio icon, sorted by name (no SVG payload). Useful for
 * building pickers; does not by itself pull icon SVGs into your bundle. */
export const reltioIcons: ReltioIcon[] = [
${metaLiteral}
];
`;
}

/** Gallery component (for the `icons.story.mdx` docs page), not a story. Imports
 * the aggregate entry so every icon is registered when the gallery renders. */
function renderGalleryModule() {
	return `${header([
		"Gallery of every Reltio icon — rendered in icons.story.mdx (the Overview",
		"docs page). Imports ./reltio so the whole set is registered when shown.",
	])}import { Icon } from "@ui5/webcomponents-react/Icon";
import { RELTIO_ICON_COLLECTION, reltioIcons } from "./reltio";

/** Grid of every Reltio icon rendered through the UI5 Icon component. */
export function ReltioIconGallery() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
				gap: "8px",
				fontFamily: "var(--sapFontFamily)",
			}}
		>
			{reltioIcons.map((icon) => {
				const fullName = \`\${RELTIO_ICON_COLLECTION}/\${icon.name}\`;
				return (
					<div
						key={icon.name}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "10px",
							padding: "16px 8px",
							border:
								"1px solid var(--sapTile_BorderColor, var(--sapList_BorderColor))",
							borderRadius: "8px",
							background: "var(--sapTile_Background)",
							color: "var(--sapTextColor)",
							textAlign: "center",
						}}
					>
						<Icon name={fullName} style={{ width: "28px", height: "28px" }} />
						<code
							style={{
								fontSize: "11px",
								color: "var(--sapContent_LabelColor)",
								wordBreak: "break-word",
							}}
						>
							{fullName}
						</code>
					</div>
				);
			})}
		</div>
	);
}
`;
}

/** Single Storybook catalog: one `meta.story` per icon, each showing the icon
 * at several sizes and semantic colors. NOT tagged `doc-only`, so every icon is
 * included in the interaction/a11y/visual test run. */
function renderCatalogStoryModule(icons) {
	const exportsSeen = new Map();
	const stories = icons
		.map((icon) => {
			const exportName = reltioComponentExportName(icon.name);
			const clash = exportsSeen.get(exportName);
			if (clash && clash !== icon.name) {
				throw new Error(
					`Export-name collision: "${icon.name}" and "${clash}" both map to "${exportName}".`,
				);
			}
			exportsSeen.set(exportName, icon.name);
			return `export const ${exportName} = meta.story({
	name: ${JSON.stringify(icon.name)},
	render: showcase(${JSON.stringify(`${COLLECTION}/${icon.name}`)}),
});`;
		})
		.join("\n\n");

	return `${header([
		"Per-icon showcase stories — one story per icon, each rendering it at",
		"several sizes and semantic colors (and exercised by the test run).",
	])}import { Stories, Title } from "@storybook/addon-docs/blocks";
import { Icon } from "@ui5/webcomponents-react/Icon";
import preview from "${PREVIEW_IMPORT}";
// Side-effect import: registers every reltio/* icon into UI5's registry.
import "./reltio";

const meta = preview.meta({
	title: ${JSON.stringify(CATALOG_PREFIX)},
	component: Icon,
	parameters: {
		layout: "centered",
		// Catalog has no args — drop the empty ArgTypes block, keep just the
		// stories list on the docs page.
		docs: {
			page: () => (
				<>
					<Title />
					<Stories />
				</>
			),
		},
	},
});

export default meta;

const ROW = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
} as const;

/** Renders one icon at several sizes and semantic colors. */
function showcase(name: string) {
	return () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
			<div style={ROW}>
				<Icon name={name} style={{ width: "16px", height: "16px" }} />
				<Icon name={name} style={{ width: "20px", height: "20px" }} />
				<Icon name={name} style={{ width: "24px", height: "24px" }} />
				<Icon name={name} style={{ width: "32px", height: "32px" }} />
				<Icon name={name} style={{ width: "48px", height: "48px" }} />
			</div>
			<div style={ROW}>
				<Icon name={name} style={{ width: "28px", height: "28px" }} />
				<Icon
					name={name}
					design="Positive"
					style={{ width: "28px", height: "28px" }}
				/>
				<Icon
					name={name}
					design="Critical"
					style={{ width: "28px", height: "28px" }}
				/>
				<Icon
					name={name}
					design="Negative"
					style={{ width: "28px", height: "28px" }}
				/>
				<Icon
					name={name}
					style={{
						width: "28px",
						height: "28px",
						color: "var(--sapBrandColor)",
					}}
				/>
			</div>
		</div>
	);
}

${stories}
`;
}

// ── Build ────────────────────────────────────────────────────────────────

async function build() {
	const renamed = await normalizeFileNames();

	const files = (await readdir(ICONS_DIR, { withFileTypes: true }))
		.filter(
			(entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".svg"),
		)
		.map((entry) => entry.name)
		.sort((a, b) => a.localeCompare(b));

	if (files.length === 0) {
		throw new Error(`No SVG files found in ${ICONS_REL}/.`);
	}

	const icons = [];
	const seen = new Map();

	for (const file of files) {
		const name = toSlug(file);
		if (name === "index") {
			throw new Error(
				`"${file}" maps to the reserved name "index", which collides with the aggregate module. Rename the file.`,
			);
		}
		if (seen.has(name)) {
			throw new Error(
				`Slug collision: "${file}" and "${seen.get(name)}" both map to "${name}".`,
			);
		}
		seen.set(name, file);

		const svg = await readFile(join(ICONS_DIR, file), "utf8");
		icons.push({
			name,
			viewBox: extractViewBox(svg),
			svg: sanitize(extractInner(svg), name, extractRootFill(svg)),
		});
	}

	// Clear previously generated modules under icons/reltio/ (per-icon + index).
	await mkdir(OUT_DIR, { recursive: true });
	for (const entry of await readdir(OUT_DIR)) {
		if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
			await rm(join(OUT_DIR, entry), { force: true });
		}
	}

	// Drop legacy flat modules from icons/ (pre–icons/reltio/ layout).
	const PRESERVED_IN_PARENT = new Set([
		"icons.stories.tsx",
		"ReltioIconGallery.tsx",
		"icons.story.mdx",
		"reltio",
		"sap",
	]);
	for (const entry of await readdir(PARENT_DIR)) {
		if (PRESERVED_IN_PARENT.has(entry)) {
			continue;
		}
		if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
			await rm(join(PARENT_DIR, entry), { force: true });
		}
	}

	// One tree-shakable registration module per icon: `@reltio/design/icons/reltio/<name>`.
	for (const icon of icons) {
		await writeFile(
			join(OUT_DIR, `${icon.name}.tsx`),
			renderIconModule(icon),
			"utf8",
		);
	}
	// Aggregate entry: `@reltio/design/icons/reltio`.
	await writeFile(join(OUT_DIR, "index.ts"), renderIndexModule(icons), "utf8");
	// Gallery component consumed by icons.story.mdx (the Overview docs page).
	await writeFile(
		join(PARENT_DIR, "ReltioIconGallery.tsx"),
		renderGalleryModule(),
		"utf8",
	);
	// Single catalog of per-icon showcase stories.
	await writeFile(
		join(PARENT_DIR, "icons.stories.tsx"),
		renderCatalogStoryModule(icons),
		"utf8",
	);

	// Generated code is committed and linted in CI — apply Biome's formatter and
	// safe fixes (import order, line wrapping) so the output is conformant
	// regardless of the icon data.
	const biomeEntry = join(ROOT, "node_modules/@biomejs/biome/bin/biome");
	const biome = spawnSync(
		process.execPath,
		[biomeEntry, "check", "--write", OUT_DIR, PARENT_DIR],
		{
			stdio: "inherit",
		},
	);
	if (biome.status !== 0) {
		throw new Error("Biome could not format the generated icon files.");
	}

	if (renamed.length > 0) {
		// eslint-disable-next-line no-console
		console.log(
			`build-icons: normalized ${renamed.length} file name(s) to kebab-case:\n` +
				renamed.map((entry) => `  • ${entry}`).join("\n"),
		);
	}

	// eslint-disable-next-line no-console
	console.log(
		`build-icons: registered ${icons.length} icons as ${COLLECTION}/* -> ${OUT_REL}/`,
	);
}

build().catch((error) => {
	// eslint-disable-next-line no-console
	console.error(`build-icons failed: ${error.message}`);
	process.exit(1);
});
