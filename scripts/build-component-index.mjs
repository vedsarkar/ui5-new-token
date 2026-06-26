import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverComponents, ROOT } from "./discoverComponents.mjs";

const OUTPUT = path.join(ROOT, "components.index.json");

/** Extract a one-line description from a component README: the first prose
 * paragraph after the H1, with the auto-injected import code fence and any
 * markdown stripped to a single line. Returns an empty string when the README
 * has no prose body (or no README at all). */
const descriptionFromReadme = (readmePath) => {
	if (!fs.existsSync(readmePath)) return "";
	const raw = fs.readFileSync(readmePath, "utf8");
	const withoutImport = raw.replace(/```tsx[\s\S]*?```/g, "");
	const lines = withoutImport.split("\n");
	const prose = [];
	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.startsWith("#")) continue;
		if (trimmed === "") {
			if (prose.length > 0) break;
			continue;
		}
		prose.push(trimmed);
	}
	const text = prose
		.join(" ")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/\s+/g, " ")
		.trim();
	// Keep the inventory line concise: first sentence, capped length.
	const firstSentence = text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
	return firstSentence.length > 200
		? `${firstSentence.slice(0, 197).trimEnd()}…`
		: firstSentence;
};

/** Build the inventory payload from a single live `discoverComponents()` pass.
 * Shared by this script (writes the committed root copy for review) and by
 * `bundle-design-assets.mjs` (writes it straight into the published `dist/`),
 * so the inventory is always generated from the same discovery as the bundled
 * schemas and the two cannot drift apart. */
export const buildComponentIndex = () => {
	const components = discoverComponents().map((c) => ({
		name: c.name,
		import: c.importPath,
		description: descriptionFromReadme(c.readmePath),
		hasSchema: c.hasSchema,
	}));
	return {
		$schema: "https://json-schema.org/draft/2020-12/schema",
		title: "ReltioDesignComponentIndex",
		generatedBy: "scripts/build-component-index.mjs",
		count: components.length,
		components,
	};
};

const main = () => {
	const payload = buildComponentIndex();
	fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, "\t")}\n`, "utf8");
	const withoutSchema = payload.components.filter((c) => !c.hasSchema).length;
	console.log(
		`✓ ${path.relative(ROOT, OUTPUT)} — ${payload.count} component(s)` +
			(withoutSchema ? ` (${withoutSchema} without a prop schema)` : ""),
	);
};

// Only write the committed root copy when run directly (`npm run
// build-component-index`); importing this module must have no side effects.
if (process.argv[1] === fileURLToPath(import.meta.url)) main();
