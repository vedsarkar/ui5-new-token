import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const API_DIR = path.join(ROOT, "openApi");

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
				return [{ name, dir, specPath, storiesPath }];
			}

			console.warn(
				`WARNING: stories "${storiesPath}" has no matching OpenAPI spec at "${specPath}" — skipping`,
			);
			return [];
		});
}

function buildMdxOpenApi({ name, spec }) {
	const specFileName = `${name}.spec.json`;
	const rawJson = JSON.stringify(spec, null, "\t").replaceAll("*/", "*\\/");
	return `${headerFor(specFileName)}

import { Meta, Stories } from "@storybook/addon-docs/blocks";
import { OpenApi } from "@/.storybook/blocks/OpenApi";
import spec from "./${specFileName}";
import meta from "./${name}.stories";

<Meta of={meta} />

<OpenApi spec={spec} />

{/* __RAW_OPENAPI_SPEC__
${rawJson}
*/}

<Stories />
`;
}

const apis = discoverApis();
if (apis.length === 0) {
	console.log(
		"No OpenAPI specs found in openApi/<Name>/<Name>.spec.json paired with openApi/<Name>/<Name>.stories.tsx — nothing to do.",
	);
	process.exit(0);
}

for (const api of apis) {
	const spec = JSON.parse(fs.readFileSync(api.specPath, "utf-8"));
	const mdx = buildMdxOpenApi({ name: api.name, spec });
	const outputPath = path.join(api.dir, `${api.name}.story.mdx`);
	fs.writeFileSync(outputPath, mdx, "utf-8");
	console.log(`Generated ${path.relative(ROOT, outputPath)}`);
}
