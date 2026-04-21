import fs from "node:fs";
import path from "node:path";
import { fakeFromSchema } from "../.storybook/utils/fakeFromSchema.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const API_DIR = path.join(ROOT, "api");
const SCHEMAS_DIR = path.join(ROOT, "public", "schemas");

const SCHEMA_PUBLIC_URL_BASE = "/schemas";

const headerFor = (name) => `{/*
  AUTO-GENERATED — do not edit by hand.
  Source: ${SCHEMA_PUBLIC_URL_BASE}/${name.toLowerCase()}.json
  Run: npm run build-api-docs
*/}`;

function discoverApis() {
	if (!fs.existsSync(API_DIR)) return [];
	return fs
		.readdirSync(API_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.flatMap((entry) => {
			const name = entry.name;
			const dir = path.join(API_DIR, name);
			const schemaPath = path.join(SCHEMAS_DIR, `${name.toLowerCase()}.json`);
			const storiesPath = path.join(dir, `${name}.stories.tsx`);
			const samplePath = path.join(dir, `${name}.sample.json`);
			if (!fs.existsSync(storiesPath)) return [];
			if (!fs.existsSync(schemaPath)) {
				console.warn(
					`WARNING: stories "${storiesPath}" has no matching schema at "${schemaPath}" — skipping`,
				);
				return [];
			}
			return [{ name, dir, schemaPath, storiesPath, samplePath }];
		});
}

/**
 * (Re)generate `<Name>.sample.json` from the schema on every run so the
 * sample never drifts out of sync with the schema definition. The file is
 * a build artefact — treat it as auto-generated, do not edit by hand.
 */
function regenerateSample(api, schema) {
	const generated = fakeFromSchema(schema);
	fs.writeFileSync(
		api.samplePath,
		`${JSON.stringify(generated, null, 2)}\n`,
		"utf-8",
	);
	console.log(`Generated ${path.relative(ROOT, api.samplePath)}`);
}

// JSON Schema → flat field-by-field markdown.
// Mirrors the structure that AI agents and humans both consume.
const MAX_DEPTH = 12;

function schemaToMarkdown(schema, schemaUrl) {
	const sections = [];
	if (schema.title) sections.push(`# ${escapeMdx(schema.title)}`);
	if (schema.description) sections.push(escapeMdx(schema.description));
	if (schemaUrl) sections.push(`**JSON Schema:** [${schemaUrl}](${schemaUrl})`);
	walk(schema, "", sections, 0);
	return sections.join("\n\n");
}

function walk(node, pathPrefix, sections, depth) {
	if (depth > MAX_DEPTH) return;
	if (node.properties) {
		const required = new Set(node.required ?? []);
		for (const [key, child] of Object.entries(node.properties)) {
			const childPath = pathPrefix ? `${pathPrefix}.${key}` : key;
			sections.push(renderSection(childPath, child, required.has(key)));
			if (child.properties) {
				walk(child, childPath, sections, depth + 1);
			} else if (child.items && hasStructure(child.items)) {
				walk(child.items, `${childPath}[]`, sections, depth + 1);
			}
		}
	} else if (node.items && hasStructure(node.items)) {
		walk(node.items, `${pathPrefix}[]`, sections, depth + 1);
	}
}

function hasStructure(node) {
	return Boolean(node.properties || node.items || node.enum);
}

function renderSection(fieldPath, node, required) {
	const lines = [`### \`${fieldPath}\``];
	const meta = [];
	meta.push(`- **Type:** \`${formatType(node)}\``);
	if (required) meta.push("- **Required**");
	if (node.default !== undefined)
		meta.push(`- **Default:** \`${formatValue(node.default)}\``);
	if (node.enum && node.enum.length > 0)
		meta.push(
			`- **Enum:** ${node.enum.map((v) => `\`${formatValue(v)}\``).join(", ")}`,
		);
	if (node.format) meta.push(`- **Format:** \`${node.format}\``);
	if (node.pattern) meta.push(`- **Pattern:** \`${node.pattern}\``);
	const range = [];
	if (node.minimum !== undefined) range.push(`min ${node.minimum}`);
	if (node.maximum !== undefined) range.push(`max ${node.maximum}`);
	if (node.minLength !== undefined) range.push(`minLength ${node.minLength}`);
	if (node.maxLength !== undefined) range.push(`maxLength ${node.maxLength}`);
	if (range.length > 0) meta.push(`- **Range:** ${range.join(", ")}`);
	if (node.readOnly) meta.push("- **Read-only**");

	if (meta.length > 0) {
		lines.push("");
		lines.push(...meta);
	}
	if (node.description) {
		lines.push("");
		lines.push(escapeMdx(node.description));
	}
	return lines.join("\n");
}

// MDX treats `{...}` as JSX expressions. Escape curly braces in plain
// markdown text we emit. Code spans/blocks (wrapped in backticks) are
// already safe in MDX, so this is only applied to descriptions/titles.
function escapeMdx(text) {
	return text.replace(/[{}]/g, "\\$&");
}

function formatType(node) {
	const baseType = Array.isArray(node.type)
		? node.type.join(" | ")
		: (node.type ?? inferType(node));
	if (baseType === "array") {
		const itemType = node.items ? formatType(node.items) : "unknown";
		return `array<${itemType}>`;
	}
	return baseType;
}

function inferType(node) {
	if (node.properties) return "object";
	if (node.items) return "array";
	if (node.enum && node.enum.length > 0) return typeof node.enum[0];
	if (node.format || node.pattern) return "string";
	return "unknown";
}

function formatValue(value) {
	if (typeof value === "string") return value;
	if (value === null) return "null";
	try {
		return JSON.stringify(value);
	} catch {
		return String(value);
	}
}

function buildMdx({ name, schema }) {
	const importNamespace = `${capitalize(name)}Stories`;
	const schemaUrl =
		schema.$id || `${SCHEMA_PUBLIC_URL_BASE}/${name.toLowerCase()}.json`;
	return `${headerFor(name)}

import { Meta, Stories } from "@storybook/addon-docs/blocks";
import * as ${importNamespace} from "./${name}.stories";

<Meta of={${importNamespace}} />

${schemaToMarkdown(schema, schemaUrl)}

<Stories />
`;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const apis = discoverApis();
if (apis.length === 0) {
	console.log(
		"No API schemas found in public/schemas/<name>.json paired with api/<Name>/<Name>.stories.tsx — nothing to do.",
	);
	process.exit(0);
}

for (const api of apis) {
	const schema = JSON.parse(fs.readFileSync(api.schemaPath, "utf-8"));
	regenerateSample(api, schema);
	const mdx = buildMdx({ name: api.name, schema });
	const outputPath = path.join(api.dir, `${api.name}.story.mdx`);
	fs.writeFileSync(outputPath, mdx, "utf-8");
	console.log(`Generated ${path.relative(ROOT, outputPath)}`);
}
