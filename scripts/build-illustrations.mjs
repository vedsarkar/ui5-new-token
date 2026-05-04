/**
 * Build script for the illustration library.
 *
 * Mirrors a curated subset of the upstream `SAP/ui5-webcomponents` illustrations
 * (Apache 2.0) into `illustrations/_source/` and emits per-illustration React
 * wrappers with the SVG bodies inlined for all three sizes (Spot, Dialog, Scene).
 *
 * Curation
 * --------
 * `ILLUSTRATION_NAMES` is the explicit allowlist of names this library ships.
 * It is the only contract — anything not listed is simply not built. The list
 * is maintained against the current SAP Horizon Figma kit; when an upstream SAP
 * illustration is visually outdated (older art crops, deprecated `_v1` variants,
 * stylistic regressions), it is omitted from the list rather than tracked
 * separately.
 *
 * To add a new illustration:
 *   1. Validate against the current SAP Horizon Figma kit
 *   2. Get design review approval
 *   3. Add the name to ILLUSTRATION_NAMES below
 *   4. Add a default `title` and `description` to `illustrations/manifest.json`
 *   5. Run `npm run build-illustrations`
 *
 * To bump the upstream snapshot:
 *   1. Pick a new tag from https://github.com/SAP/ui5-webcomponents/releases
 *   2. Update SAP_REF below
 *   3. Run `npm run build-illustrations`
 *   4. Review the diff (visual changes) and commit
 *
 * The script writes raw SVGs to `illustrations/_source/<name>-<size>.svg` (build
 * artifacts, not part of the public package surface) and the generated React
 * components to `illustrations/<PascalName>.tsx`. Orphaned files left over from
 * previous runs (e.g. when a name is removed from ILLUSTRATION_NAMES) are
 * deleted during the reconcile pass at the start of every build.
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SAP_REF = "v2.21.1";
const SAP_REPO = "UI5/webcomponents";
const SAP_PATH = "packages/fiori/src/illustrations";

const SIZES = ["Spot", "Dialog", "Scene"];

const SIZE_LOWER = {
	Spot: "spot",
	Dialog: "dialog",
	Scene: "scene",
};

const FETCH_CONCURRENCY = 8;
const FETCH_RETRIES = 4;

const ILLUSTRATIONS_OUTPUT_DIR = "illustrations";
const ILLUSTRATIONS_SOURCE_DIR = "illustrations/_source";
const VARIABLES_CSS = "public/variables.css";
const MANIFEST_PATH = "illustrations/manifest.json";

/**
 * Names of SAP illustrations that pass design review against the current SAP
 * Horizon Figma kit. This is the explicit allowlist — anything not listed is
 * not built. See the file header comment for the workflow to add a new name.
 */
const ILLUSTRATION_NAMES = [
	"Achievement",
	"AddDimensions",
	"AddPeopleToCalendar",
	"AddingColumns",
	"BeforeSearch",
	"DragFilesToUpload",
	"EmptyPlanningCalendar",
	"FilteringColumns",
	"GroupingColumns",
	"KeyTask",
	"NewMail",
	"NoActivities",
	"NoChartData",
	"NoColumnsSet",
	"NoData",
	"NoEntries",
	"NoFilterResults",
	"NoMail",
	"NoNotifications",
	"NoSavedItems",
	"NoSearchResults",
	"NoTasks",
	"PageNotFound",
	"ReceiveAppreciation",
	"ResizingColumns",
	"SignOut",
	"SortingColumns",
	"UnableToLoad",
	"UnableToLoadImage",
	"UnableToUpload",
	"UploadToCloud",
	"UserHasSignedUp",
];

function pascalToKebab(name) {
	return name
		.replace(/_/g, "-")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();
}

function humanizeKebab(name) {
	const parts = name.split("-");
	const first = parts[0];
	if (!first) return "";
	return [first[0].toUpperCase() + first.slice(1), ...parts.slice(1)].join(" ");
}

function rawUrl(pascalName, size) {
	return `https://raw.githubusercontent.com/${SAP_REPO}/${SAP_REF}/${SAP_PATH}/sapIllus-${size}-${pascalName}.svg`;
}

async function sleep(ms) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url) {
	let lastError;
	for (let attempt = 0; attempt < FETCH_RETRIES; attempt += 1) {
		try {
			const res = await fetch(url);
			if (res.status === 404) {
				throw new Error(`HTTP 404 for ${url}`);
			}
			if (!res.ok) {
				throw new Error(`HTTP ${res.status} for ${url}`);
			}
			return await res.text();
		} catch (err) {
			lastError = err;
			const backoff = 250 * 2 ** attempt;
			await sleep(backoff);
		}
	}
	throw lastError;
}

async function runWithConcurrency(items, limit, worker) {
	const results = new Array(items.length);
	let cursor = 0;
	const runners = Array.from({ length: limit }, async () => {
		while (true) {
			const i = cursor;
			cursor += 1;
			if (i >= items.length) return;
			results[i] = await worker(items[i]);
		}
	});
	await Promise.all(runners);
	return results;
}

async function downloadAllSvgs() {
	const tasks = [];
	for (const pascal of ILLUSTRATION_NAMES) {
		for (const size of SIZES) {
			tasks.push({ pascal, size });
		}
	}

	console.log(`Downloading ${tasks.length} SVGs from SAP @ ${SAP_REF}…`);

	let downloaded = 0;
	await runWithConcurrency(
		tasks,
		FETCH_CONCURRENCY,
		async ({ pascal, size }) => {
			const url = rawUrl(pascal, size);
			const svg = await fetchWithRetry(url);
			const kebab = pascalToKebab(pascal);
			const target = join(
				ILLUSTRATIONS_SOURCE_DIR,
				`${kebab}-${SIZE_LOWER[size]}.svg`,
			);
			await writeFile(target, svg, "utf-8");
			downloaded += 1;
			if (downloaded % 25 === 0 || downloaded === tasks.length) {
				console.log(`  ${downloaded}/${tasks.length} downloaded`);
			}
		},
	);

	console.log(`Saved ${tasks.length} SVGs to ${ILLUSTRATIONS_SOURCE_DIR}/`);
}

async function validateInventory() {
	const files = (await readdir(ILLUSTRATIONS_SOURCE_DIR)).filter(
		(f) => f.endsWith(".svg") && !f.startsWith("."),
	);
	const expected = new Set();
	for (const pascal of ILLUSTRATION_NAMES) {
		const kebab = pascalToKebab(pascal);
		for (const size of SIZES) {
			expected.add(`${kebab}-${SIZE_LOWER[size]}.svg`);
		}
	}
	const missing = [];
	for (const fname of expected) {
		if (!files.includes(fname)) missing.push(fname);
	}
	if (missing.length > 0) {
		console.error("Missing illustration files:");
		for (const m of missing) console.error(`  - ${m}`);
		process.exit(1);
	}
	console.log(`Inventory validated: ${expected.size} files present.`);
}

/**
 * Remove SVG files in `_source/` and TSX wrappers in `illustrations/` that
 * are NOT in the current ILLUSTRATION_NAMES list. Keeps the working tree
 * clean after exclusions, renames, or upstream removals.
 */
async function reconcileOrphans() {
	const expectedSvgs = new Set();
	const expectedTsx = new Set([
		"Illustration.tsx",
		"IllustrationDoc.tsx",
		"Illustrations.stories.tsx",
	]);
	for (const pascal of ILLUSTRATION_NAMES) {
		const kebab = pascalToKebab(pascal);
		for (const size of SIZES) {
			expectedSvgs.add(`${kebab}-${SIZE_LOWER[size]}.svg`);
		}
		expectedTsx.add(`${pascal}.tsx`);
	}

	let removed = 0;

	if (existsSync(ILLUSTRATIONS_SOURCE_DIR)) {
		for (const fname of await readdir(ILLUSTRATIONS_SOURCE_DIR)) {
			if (!fname.endsWith(".svg")) continue;
			if (expectedSvgs.has(fname)) continue;
			await unlink(join(ILLUSTRATIONS_SOURCE_DIR, fname));
			removed += 1;
		}
	}

	if (existsSync(ILLUSTRATIONS_OUTPUT_DIR)) {
		for (const fname of await readdir(ILLUSTRATIONS_OUTPUT_DIR)) {
			if (!fname.endsWith(".tsx")) continue;
			if (expectedTsx.has(fname)) continue;
			await unlink(join(ILLUSTRATIONS_OUTPUT_DIR, fname));
			removed += 1;
		}
	}

	if (removed > 0) {
		console.log(`Reconcile: removed ${removed} orphan file(s).`);
	}
}

async function validateVariables() {
	const css = await readFile(VARIABLES_CSS, "utf-8");
	const knownVars = new Set();
	for (const m of css.matchAll(/--([A-Za-z0-9_]+):/g)) {
		knownVars.add(`--${m[1]}`);
	}

	const files = (await readdir(ILLUSTRATIONS_SOURCE_DIR)).filter((f) =>
		f.endsWith(".svg"),
	);
	const missing = new Map();
	for (const fname of files) {
		const content = await readFile(
			join(ILLUSTRATIONS_SOURCE_DIR, fname),
			"utf-8",
		);
		for (const m of content.matchAll(/var\((--[A-Za-z0-9_]+)\)/g)) {
			const varName = m[1];
			if (!knownVars.has(varName)) {
				if (!missing.has(varName)) missing.set(varName, new Set());
				missing.get(varName).add(fname);
			}
		}
	}

	if (missing.size > 0) {
		console.error(
			`Found ${missing.size} unknown SAP variable(s) referenced by SVGs but missing from ${VARIABLES_CSS}:`,
		);
		for (const [varName, files] of missing) {
			const sample = Array.from(files).slice(0, 3).join(", ");
			console.error(
				`  - ${varName} (used in ${files.size} file(s), e.g. ${sample})`,
			);
		}
		process.exit(1);
	}
	console.log("All SAP variables referenced by SVGs exist in variables.css.");
}

async function readManifest() {
	if (!existsSync(MANIFEST_PATH)) return {};
	try {
		return JSON.parse(await readFile(MANIFEST_PATH, "utf-8"));
	} catch (err) {
		console.warn(`Failed to parse ${MANIFEST_PATH}: ${err.message}`);
		return {};
	}
}

function escapeForTemplate(text) {
	return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function extractSvgInfo(svgString) {
	const open = svgString.match(/<svg([^>]*)>/i);
	if (!open) throw new Error("Could not find <svg> opening tag");
	const attrs = open[1];
	const viewBoxMatch = attrs.match(/viewBox="([^"]+)"/);
	const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 160 160";
	const inner = svgString
		.replace(/<svg[^>]*>/i, "")
		.replace(/<\/svg>\s*$/i, "")
		.trim();
	return { viewBox, inner };
}

function jsxifySvgInner(inner) {
	let out = inner;

	out = out.replace(/<!--[\s\S]*?-->/g, "");

	out = out.replace(
		/<style([^>]*?)>([\s\S]*?)<\/style>/g,
		(_match, attrs, body) =>
			`<style${attrs} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(body)} }} />`,
	);

	out = out.replace(/\bclass="/g, 'className="');
	out = out.replace(/\bclip-path="/g, 'clipPath="');
	out = out.replace(/\bfill-rule="/g, 'fillRule="');
	out = out.replace(/\bstroke-width="/g, 'strokeWidth="');
	out = out.replace(/\bstroke-linecap="/g, 'strokeLinecap="');
	out = out.replace(/\bstroke-linejoin="/g, 'strokeLinejoin="');
	out = out.replace(/\bstroke-miterlimit="/g, 'strokeMiterlimit="');
	out = out.replace(/\bclip-rule="/g, 'clipRule="');
	out = out.replace(/\bstop-color="/g, 'stopColor="');
	out = out.replace(/\bstop-opacity="/g, 'stopOpacity="');
	out = out.replace(/\bxmlns:xlink="/g, 'xmlnsXlink="');
	out = out.replace(/\bxlink:href="/g, 'xlinkHref="');
	out = out.replace(/\bmask-type="/g, 'maskType="');

	out = out.replace(/\sxmlns="[^"]*"/g, "");

	return out;
}

function generateComponent({ pascalName, title, description, sizes }) {
	const renderSvg = (size) => {
		const svgClass = `svg${size}`;
		const { viewBox, inner } = sizes[size];
		const jsx = jsxifySvgInner(inner);
		return `\t\t\t<svg
\t\t\t\tclassName={classNames(styles.svg, styles.${svgClass})}
\t\t\t\tviewBox="${viewBox}"
\t\t\t\taria-hidden="true"
\t\t\t\tfocusable="false"
\t\t\t>
${jsx
	.split("\n")
	.map((line) => (line ? `\t\t\t\t${line}` : ""))
	.join("\n")}
\t\t\t</svg>`;
	};

	return `import { classNames } from "@/utils/classNames";
import { Illustration } from "./Illustration";
import styles from "./Illustration.module.css";
import type { IllustrationProps } from "./Illustration.types";

export const ${pascalName} = ({
\tsize = "dialog",
\ttitle = "${escapeForTemplate(title)}",
\tdescription${description ? ` = "${escapeForTemplate(description)}"` : ""},
\t...rest
}: IllustrationProps) => (
\t<Illustration size={size} title={title} description={description} {...rest}>
${renderSvg("Spot")}
${renderSvg("Dialog")}
${renderSvg("Scene")}
\t</Illustration>
);
`;
}

function generateIndex(illustrations) {
	const sorted = [...illustrations].sort((a, b) =>
		a.pascalName.localeCompare(b.pascalName),
	);
	const imports = sorted
		.map(({ pascalName }) => `import { ${pascalName} } from "./${pascalName}";`)
		.join("\n");
	const reExports = sorted
		.map(({ pascalName }) => `\t${pascalName},`)
		.join("\n");
	const mapEntries = sorted
		.map(({ pascalName }) => `\t${pascalName}: ${pascalName},`)
		.join("\n");
	return `export { Illustration } from "./Illustration";
export type {
\tIllustrationCoreProps,
\tIllustrationProps,
\tIllustrationSize,
} from "./Illustration.types";

${imports}

export {
${reExports}
};

export const illustrationMap: Record<
\tstring,
\tReact.ComponentType<import("./Illustration.types").IllustrationProps>
> = {
${mapEntries}
};
`;
}

function generateStories(illustrations) {
	const sorted = [...illustrations].sort((a, b) =>
		a.pascalName.localeCompare(b.pascalName),
	);
	const stories = sorted
		.map(
			({ pascalName }) => `export const ${pascalName}: Story = {
\trender: () => (
\t\t<div className={styles.story}>
\t\t\t<div data-theme="horizon-light" className={styles.row}>
\t\t\t\t<Illustrations.${pascalName} size="spot" />
\t\t\t\t<Illustrations.${pascalName} size="dialog" />
\t\t\t\t<Illustrations.${pascalName} size="scene" />
\t\t\t</div>
\t\t\t<div data-theme="horizon-dark" className={styles.row}>
\t\t\t\t<Illustrations.${pascalName} size="spot" />
\t\t\t\t<Illustrations.${pascalName} size="dialog" />
\t\t\t\t<Illustrations.${pascalName} size="scene" />
\t\t\t</div>
\t\t</div>
\t),
};`,
		)
		.join("\n\n");
	return `import type { Meta, StoryObj } from "@storybook/react-vite";
import { Illustration } from "./IllustrationDoc";
import styles from "./IllustrationStories.module.css";
import { illustrationMap as Illustrations } from "./index";

const meta: Meta = {
\ttitle: "Illustrations",
\tcomponent: Illustration,
\tparameters: {
\t\tlayout: "centered",
\t},
};

export default meta;
type Story = StoryObj;

${stories}
`;
}

async function main() {
	if (!existsSync(ILLUSTRATIONS_SOURCE_DIR)) {
		await mkdir(ILLUSTRATIONS_SOURCE_DIR, { recursive: true });
	}
	if (!existsSync(ILLUSTRATIONS_OUTPUT_DIR)) {
		await mkdir(ILLUSTRATIONS_OUTPUT_DIR, { recursive: true });
	}

	await reconcileOrphans();
	await downloadAllSvgs();
	await validateInventory();
	await validateVariables();

	const manifest = await readManifest();

	const illustrations = [];
	for (const pascalName of ILLUSTRATION_NAMES) {
		const kebabName = pascalToKebab(pascalName);
		const sizes = {};
		for (const size of SIZES) {
			const filePath = join(
				ILLUSTRATIONS_SOURCE_DIR,
				`${kebabName}-${SIZE_LOWER[size]}.svg`,
			);
			const svgString = await readFile(filePath, "utf-8");
			sizes[size] = extractSvgInfo(svgString);
		}
		const entry = manifest[kebabName] || {};
		const title = entry.title || humanizeKebab(kebabName);
		const description = entry.description || "";

		const code = generateComponent({
			pascalName,
			title,
			description,
			sizes,
		});
		await writeFile(join(ILLUSTRATIONS_OUTPUT_DIR, `${pascalName}.tsx`), code);

		illustrations.push({ pascalName, kebabName, title, description });
	}
	console.log(`Generated ${illustrations.length} illustration components.`);

	await writeFile(
		join(ILLUSTRATIONS_OUTPUT_DIR, "index.ts"),
		generateIndex(illustrations),
	);
	console.log("Generated: index.ts");

	await writeFile(
		join(ILLUSTRATIONS_OUTPUT_DIR, "Illustrations.stories.tsx"),
		generateStories(illustrations),
	);
	console.log("Generated: Illustrations.stories.tsx");

	console.log("\nFormatting generated files…");
	execSync("npm run format", { stdio: "inherit" });
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
