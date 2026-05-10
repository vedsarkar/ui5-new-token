import fs from "node:fs";
import postcss from "postcss";
import postcssModules from "postcss-modules";

/**
 * Compile every `*.module.css` in the workspace to a JavaScript companion
 * `*.module.css.ts` that:
 *   - Injects the original (pre-hash) CSS into the document `<head>` at
 *     runtime via `style-inject` (so consumers of the published
 *     `@reltio/design` package don't need their own CSS Modules pipeline).
 *   - Exports the `{ originalName: hashedName }` token map as the default
 *     export — this is what `import styles from "./X.module.css"` resolves
 *     to when TypeScript looks at the `.ts` companion.
 *
 * The token map is inlined directly into the `.ts` file; we deliberately
 * do NOT emit a separate `.module.css.json` artifact. Earlier the docs
 * pipeline read those JSONs to render a CSS Classes table on each
 * component's docs page — that section has been removed, so the JSONs
 * are no longer consumed and would only add stale build artifacts.
 */

const generateScopedName = (name, filename) => {
	const componentName = filename
		.split("/")
		.pop()
		?.replace(/\.module\.css$/, "");
	const hash = Buffer.from(`${filename}${name}`).toString("base64").slice(0, 5);
	return `${componentName}_${name}__${hash}`;
};

const template = (css, tokens) => `import styleInject from 'style-inject';
const tokens = ${JSON.stringify(tokens, null, "\t")};
styleInject(\`\n${css}\`);
export default tokens;
`;

fs.glob("**/*.module.css", (err, matches) => {
	if (err) throw err;
	matches.forEach(async (path) => {
		const css = fs.readFileSync(path);
		let capturedTokens = {};
		const result = await postcss([
			postcssModules({
				generateScopedName,
				// Suppress the default getJSON callback so postcss-modules does
				// NOT write a sibling `*.module.css.json` file to disk. We grab
				// the token map in-memory and inline it into the `.ts` file.
				getJSON: (_cssFileName, json) => {
					capturedTokens = json;
				},
			}),
		]).process(css, { from: path });
		fs.writeFileSync(`${path}.ts`, template(result.css, capturedTokens));
	});
});
