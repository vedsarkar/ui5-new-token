import fs from "node:fs";
import path from "node:path";
import { buildComponentJsonSchema } from "./buildJsonSchema.mjs";
import { createTypeExtractor } from "./extractTypeApi.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");

/** Conventional name of the exported props type alias for a component
 * directory: `<ComponentName>Props`. The build pipeline currently only
 * resolves this single export per component; callers can change the type
 * name freely as long as it follows this convention. */
const propsTypeNameFor = (componentName) => `${componentName}Props`;

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
  Resolved prop types: TypeScript Compiler API walks generics + intersections + cross-package imports
  Run: npm run build-component-docs
*/}`;

const FIXED_IMPORTS = `import { Meta, Stories } from "@storybook/addon-docs/blocks";
import { JsonSchema } from "@/.storybook/blocks/JsonSchema";
import { SectionHeading } from "@/.storybook/blocks/SectionHeading";`;

/** Escape a string for safe embedding inside an MDX comment block.
 * The only sequence that closes a `/* ... *\/` comment is the literal `*\/`,
 * so we break it up the same way build-api-docs.mjs does for raw JSON. */
const escapeForMdxComment = (text) => text.replaceAll("*/", "*\\/");

const buildMdx = ({ componentName, readme, jsonSchemaSource, storiesSource }) =>
	`${HEADER}

${FIXED_IMPORTS}
import * as ${componentName}Stories from "./${componentName}.stories";
import schema from "./${componentName}.schema.json";

<Meta of={${componentName}Stories} />

${readme.trim()}

<SectionHeading>Prop types</SectionHeading>

<JsonSchema schema={schema} />

{/* __JSON_SCHEMA__
${escapeForMdxComment(jsonSchemaSource)}
*/}

{/* __RAW_STORIES_SOURCE__
${escapeForMdxComment(storiesSource.trim())}
*/}

<div style={{ marginTop: 32 }}>
	<Stories />
</div>
`;

/** Run the TS Compiler API extractor against a component's `.types.ts`,
 * convert the result to a JSON Schema document, and write it to disk as
 * `<Component>.schema.json`. Returns the schema (also as serialized text
 * for inlining into MDX) so the caller can wire it through the template.
 *
 * Failures are surfaced as warnings but do NOT abort the build — the rest
 * of the docs page is still useful even without a schema. */
const buildComponentSchema = (typeExtractor, dir, componentName) => {
	const exportedName = propsTypeNameFor(componentName);
	const typesPath = path.join(dir, `${componentName}.types.ts`);
	const schemaPath = path.join(dir, `${componentName}.schema.json`);
	try {
		const props = typeExtractor.extractProps(typesPath, exportedName);
		const schema = buildComponentJsonSchema({
			componentName,
			exportedTypeName: exportedName,
			props,
		});
		const serialized = `${JSON.stringify(schema, null, 2)}\n`;
		fs.writeFileSync(schemaPath, serialized, "utf8");
		return { schema, serialized: serialized.trimEnd() };
	} catch (err) {
		console.warn(
			`  ! Schema generation skipped for ${componentName}: ${err.message}`,
		);
		// Remove a stale schema so consumers don't read outdated content.
		if (fs.existsSync(schemaPath)) fs.unlinkSync(schemaPath);
		return null;
	}
};

const buildOne = (typeExtractor, { dir, componentName }) => {
	const readmePath = path.join(dir, "README.md");
	const typesPath = path.join(dir, `${componentName}.types.ts`);
	const storiesPath = path.join(dir, `${componentName}.stories.tsx`);
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
	const storiesSource = fs.readFileSync(storiesPath, "utf8");
	const schemaResult = buildComponentSchema(typeExtractor, dir, componentName);
	if (!schemaResult) {
		throw new Error(
			`Cannot build MDX for ${componentName} without a JSON Schema. ` +
				`Fix the .types.ts (export ${propsTypeNameFor(componentName)}) and rerun.`,
		);
	}

	const mdx = buildMdx({
		componentName,
		readme,
		jsonSchemaSource: schemaResult.serialized,
		storiesSource,
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

	const startTs = Date.now();
	console.log(
		`Initializing TypeScript program for ${dirs.length} component(s)…`,
	);
	const typeExtractor = createTypeExtractor(ROOT);
	console.log(`  TS program ready in ${Date.now() - startTs}ms`);

	for (const entry of dirs) {
		try {
			const outPath = buildOne(typeExtractor, entry);
			console.log(`✓ ${path.relative(ROOT, outPath)}`);
		} catch (err) {
			console.error(`✗ ${entry.componentName}: ${err.message}`);
			process.exitCode = 1;
		}
	}
	typeExtractor.dispose();
};

main();
