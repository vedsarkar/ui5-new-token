import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "components");

/** Components opted into the static-MDX pipeline. A component appears here
 * once its API is stable and we want remote MCP consumers to receive the
 * rich payload (full README, raw types, raw stories source). Components in
 * iteration stay out of this list and render via the default autodocs page. */
const PILOT_COMPONENTS = [
	"AppSelector",
	"Chat",
	"Details",
	"ErrorBoundary",
	"Markdown",
	"Skeleton",
	"TextArea",
];

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

/** Render a static markdown table of CSS classes for a component, wrapped in
 * a collapsed `<Details>`. Mirrors what `<CssClasses />` block produces at
 * runtime, but inlined as plain markdown so both humans and AI agents (via
 * MCP) see the same content.
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

const buildOne = (componentName) => {
	const dir = path.join(COMPONENTS_DIR, componentName);
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
	for (const componentName of PILOT_COMPONENTS) {
		try {
			const outPath = buildOne(componentName);
			console.log(`✓ ${path.relative(ROOT, outPath)}`);
		} catch (err) {
			console.error(`✗ ${componentName}: ${err.message}`);
			process.exitCode = 1;
		}
	}
};

main();
