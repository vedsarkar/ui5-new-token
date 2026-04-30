import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const API_DIR = path.join(ROOT, "openApi");
const SCHEMAS_DIR = path.join(ROOT, "public", "schemas");

const SCHEMA_PUBLIC_URL_BASE = "/schemas";

const headerFor = (source) => `{/*
  AUTO-GENERATED — do not edit by hand.
  Source: ${source}
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
			const storiesPath = path.join(dir, `${name}.stories.tsx`);
			if (!fs.existsSync(storiesPath)) return [];

			const specPath = path.join(dir, `${name}.spec.json`);
			if (fs.existsSync(specPath)) {
				return [{ name, dir, specPath, storiesPath, mode: "openapi" }];
			}

			const schemaPath = path.join(SCHEMAS_DIR, `${name.toLowerCase()}.json`);
			if (fs.existsSync(schemaPath)) {
				console.warn(
					`WARNING: "${name}" uses legacy JSON Schema. Consider migrating to OpenAPI at "${specPath}".`,
				);
				return [{ name, dir, schemaPath, storiesPath, mode: "schema" }];
			}

			console.warn(
				`WARNING: stories "${storiesPath}" has no matching spec — skipping`,
			);
			return [];
		});
}

function buildMdx({ name, schema }) {
	const importNamespace = `${capitalize(name)}Stories`;
	const schemaUrl = `${SCHEMA_PUBLIC_URL_BASE}/${name.toLowerCase()}.json`;
	const rawJson = JSON.stringify(schema, null, "\t").replaceAll("*/", "*\\/");
	return `${headerFor(schemaUrl)}

import { Meta, Stories } from "@storybook/addon-docs/blocks";
import { JsonSchema } from "@/.storybook/blocks/JsonSchema";
import * as ${importNamespace} from "./${name}.stories";

<Meta of={${importNamespace}} />

<JsonSchema url="${schemaUrl}" />

{/* __RAW_JSON_SCHEMA__
${rawJson}
*/}

<Stories />
`;
}

function buildMdxOpenApi({ name, spec }) {
	const importNamespace = `${capitalize(name)}Stories`;
	const specFileName = `${name}.spec.json`;
	const rawJson = JSON.stringify(spec, null, "\t").replaceAll("*/", "*\\/");
	return `${headerFor(specFileName)}

import { Meta, Stories } from "@storybook/addon-docs/blocks";
import { OpenApi } from "@/.storybook/blocks/OpenApi";
import spec from "./${specFileName}";
import * as ${importNamespace} from "./${name}.stories";

<Meta of={${importNamespace}} />

<OpenApi spec={spec} />

{/* __RAW_OPENAPI_SPEC__
${rawJson}
*/}

<Stories />
`;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const apis = discoverApis();
if (apis.length === 0) {
	console.log(
		"No API specs found in api/<Name>/<name>.spec.json paired with api/<Name>/<Name>.stories.tsx — nothing to do.",
	);
	process.exit(0);
}

for (const api of apis) {
	let mdx;
	if (api.mode === "openapi") {
		const spec = JSON.parse(fs.readFileSync(api.specPath, "utf-8"));
		mdx = buildMdxOpenApi({ name: api.name, spec });
	} else {
		const schema = JSON.parse(fs.readFileSync(api.schemaPath, "utf-8"));
		mdx = buildMdx({ name: api.name, schema });
	}
	const outputPath = path.join(api.dir, `${api.name}.story.mdx`);
	fs.writeFileSync(outputPath, mdx, "utf-8");
	console.log(`Generated ${path.relative(ROOT, outputPath)}`);
}
