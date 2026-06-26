import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");

/** First-level directory roots whose subdirectories are documented, endorsed
 * components, mapped to the published `@reltio/design` subpath consumers import
 * them from. Single source of truth shared by `build-component-index.mjs` and
 * `bundle-design-assets.mjs` so the inventory and the bundled schemas never
 * drift apart. */
const ROOTS = [
	{ dir: "components", subpath: "components" },
	{ dir: "charts", subpath: "charts" },
];

/**
 * Discover every endorsed component directory. A directory qualifies when it
 * has a `README.md` (documented) and/or a generated `<Name>.schema.json`. Each
 * entry reports whether a prop schema exists so callers can surface
 * schema-less components explicitly instead of dropping them.
 *
 * @returns {Array<{ name: string, subpath: string, importPath: string,
 *   schemaPath: string, readmePath: string, hasSchema: boolean }>}
 *   sorted by component name.
 */
export const discoverComponents = () => {
	const entries = [];
	for (const { dir, subpath } of ROOTS) {
		const rootPath = path.join(ROOT, dir);
		if (!fs.existsSync(rootPath)) continue;
		for (const entry of fs.readdirSync(rootPath, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const name = entry.name;
			const componentDir = path.join(rootPath, name);
			const schemaPath = path.join(componentDir, `${name}.schema.json`);
			const readmePath = path.join(componentDir, "README.md");
			const hasSchema = fs.existsSync(schemaPath);
			const hasReadme = fs.existsSync(readmePath);
			if (!hasSchema && !hasReadme) continue;
			entries.push({
				name,
				subpath,
				importPath: `@reltio/design/${subpath}`,
				schemaPath,
				readmePath,
				hasSchema,
			});
		}
	}
	entries.sort((a, b) => a.name.localeCompare(b.name));
	return entries;
};
