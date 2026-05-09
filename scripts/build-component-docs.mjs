import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

/** Glob patterns for top-level component folders that may opt into the
 * static-MDX pipeline. Mirrors the `stories` pattern in `.storybook/main.ts`
 * so the same conventions cover both UI components and chart components.
 *
 * A component opts in by adding a `README.md` to its folder; the script
 * automatically picks it up. Components without a `README.md` are skipped
 * (they render via the default Storybook autodocs page until ready to ship). */
const COMPONENT_GLOBS = ["components/*", "charts/*"];

/** Discover all opt-in component directories: any folder matching one of
 * COMPONENT_GLOBS that contains a `README.md` plus the three sources we
 * inline into the docs page (`<Name>.types.ts`, `<Name>.stories.tsx`).
 *
 * Internal helpers without stories (e.g. `charts/Chart` — the shared
 * ECharts wrapper used by other chart components) are intentionally skipped
 * because they have no public docs surface. Sub-folders one level deeper
 * (e.g. `components/Chat/components/AssistantMessage/`) are also skipped —
 * only first-level dirs under each root are considered. */
const discoverComponentDirs = () => {
	const dirs = [];
	for (const pattern of COMPONENT_GLOBS) {
		const [parent] = pattern.split("/");
		const parentPath = path.join(ROOT, parent);
		if (!fs.existsSync(parentPath)) continue;
		for (const entry of fs.readdirSync(parentPath, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const dir = path.join(parentPath, entry.name);
			const componentName = entry.name;
			const requiredSources = [
				path.join(dir, "README.md"),
				path.join(dir, `${componentName}.types.ts`),
				path.join(dir, `${componentName}.stories.tsx`),
			];
			if (requiredSources.every((p) => fs.existsSync(p))) {
				dirs.push({ dir, componentName });
			}
		}
	}
	return dirs;
};

const HEADER = `{/*
  AUTO-GENERATED — do not edit by hand.
  Sources: README.md, <Component>.types.ts, <Component>.stories.tsx
  Run: npm run build-component-docs
*/}`;

const FIXED_IMPORTS = `import { ArgTypes, Meta, Stories } from "@storybook/addon-docs/blocks";
import { SectionHeading } from "@/.storybook/blocks/SectionHeading";
import { Details } from "@/components/Details";`;

/** Escape a string for safe embedding inside an MDX comment block.
 * The only sequence that closes a `/* ... *\/` comment is the literal `*\/`,
 * so we break it up the same way build-api-docs.mjs does for raw JSON. */
const escapeForMdxComment = (text) => text.replaceAll("*/", "*\\/");

/** Render a static markdown list of stable CSS class selectors for a
 * component, wrapped in a collapsed `<Details>`. Inlined as plain markdown so
 * both humans and AI agents (via MCP) see the same content.
 *
 * The class map is read from `<Component>.module.css.json` produced by
 * `scripts/build-css.mjs`. If the file is missing or empty, the section is
 * skipped (component might be pure UI5 wrapper with no CSS Module). */
const buildCssClassesSection = (cssJsonPath) => {
	if (!fs.existsSync(cssJsonPath)) return "";
	const map = JSON.parse(fs.readFileSync(cssJsonPath, "utf8"));
	const rows = Object.entries(map);
	if (rows.length === 0) return "";

	const items = rows
		.map(([, hashed]) => `- \`.reltio_${hashed.split("__")[0]}\``)
		.join("\n");

	return `
<Details>
	<summary>CSS classes</summary>

Stable class names for external customization. These classes are always present on the rendered elements regardless of build hash.

${items}

</Details>
`;
};

const buildMdx = ({
	componentName,
	readme,
	typesSource,
	storiesSource,
	cssClassesSection,
}) =>
	`${HEADER}

${FIXED_IMPORTS}
import * as ${componentName}Stories from "./${componentName}.stories";

<Meta of={${componentName}Stories} />

${readme.trim()}

<SectionHeading>Prop types</SectionHeading>

<ArgTypes />

{/* __RAW_TYPES_SOURCE__
${escapeForMdxComment(typesSource.trim())}
*/}
${cssClassesSection}
{/* __RAW_STORIES_SOURCE__
${escapeForMdxComment(storiesSource.trim())}
*/}

<div style={{ marginTop: 32 }}>
	<Stories />
</div>
`;

const buildOne = ({ dir, componentName }) => {
	const readmePath = path.join(dir, "README.md");
	const typesPath = path.join(dir, `${componentName}.types.ts`);
	const storiesPath = path.join(dir, `${componentName}.stories.tsx`);
	const cssJsonPath = path.join(dir, `${componentName}.module.css.json`);
	const outPath = path.join(dir, `${componentName}.story.mdx`);

	for (const [label, p] of [
		["README.md", readmePath],
		[`${componentName}.types.ts`, typesPath],
		[`${componentName}.stories.tsx`, storiesPath],
	]) {
		if (!fs.existsSync(p)) {
			throw new Error(`Missing required source for ${componentName}: ${label}`);
		}
	}

	const readme = fs.readFileSync(readmePath, "utf8");
	const typesSource = fs.readFileSync(typesPath, "utf8");
	const storiesSource = fs.readFileSync(storiesPath, "utf8");
	const cssClassesSection = buildCssClassesSection(cssJsonPath);

	const mdx = buildMdx({
		componentName,
		readme,
		typesSource,
		storiesSource,
		cssClassesSection,
	});

	fs.writeFileSync(outPath, mdx, "utf8");
	return outPath;
};

const main = () => {
	const dirs = discoverComponentDirs();
	if (dirs.length === 0) {
		console.log(
			"No components with README.md found under components/* or charts/*.",
		);
		return;
	}
	for (const entry of dirs) {
		try {
			const outPath = buildOne(entry);
			console.log(`✓ ${path.relative(ROOT, outPath)}`);
		} catch (err) {
			console.error(`✗ ${entry.componentName}: ${err.message}`);
			process.exitCode = 1;
		}
	}
};

main();
