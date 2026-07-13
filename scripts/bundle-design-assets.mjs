/**
 * Bundle the non-TypeScript assets into `packages/design/dist/` after the `tsc`
 * build so the published `@reltio/design` package is self-describing:
 *
 *   dist/components.index.json   flat inventory (name → import → description)
 *   dist/schemas/<Name>.schema.json   resolved prop schemas for discovery
 *   dist/bin/...                  the `@reltio/design` CLI dispatcher
 *
 * The inventory is generated here (not copied from the committed root file) from
 * the same `discoverComponents()` pass that selects the schemas, so the bundled
 * index and the bundled schemas are always consistent and no stale committed
 * snapshot can leak into the published package.
 *
 * Run from `packages/design` postbuild: `node ../../scripts/bundle-design-assets.mjs`.
 */
import fs from "node:fs";
import path from "node:path";
import { buildComponentIndex } from "./build-component-index.mjs";
import { discoverComponents, ROOT } from "./discoverComponents.mjs";

const DESIGN = path.join(ROOT, "packages", "design");
const DIST = path.join(DESIGN, "dist");

/** Copy exactly the schemas the index advertises (`hasSchema` entries), using
 * the same discovery as `build-component-index.mjs` so the bundled inventory and
 * the bundled schema files cannot drift apart. */
const copySchemas = () => {
	const schemasDest = path.join(DIST, "schemas");
	fs.mkdirSync(schemasDest, { recursive: true });
	let count = 0;
	for (const component of discoverComponents()) {
		if (!component.hasSchema) continue;
		fs.copyFileSync(
			component.schemaPath,
			path.join(schemasDest, `${component.name}.schema.json`),
		);
		count += 1;
	}
	return count;
};

const main = () => {
	if (!fs.existsSync(DIST)) {
		console.error(`dist not found at ${DIST} — run the tsc build first.`);
		process.exit(1);
	}

	fs.writeFileSync(
		path.join(DIST, "components.index.json"),
		`${JSON.stringify(buildComponentIndex(), null, "\t")}\n`,
		"utf8",
	);

	const schemaCount = copySchemas();

	const binSrc = path.join(DESIGN, "bin");
	if (fs.existsSync(binSrc))
		fs.cpSync(binSrc, path.join(DIST, "bin"), { recursive: true });

	// `tsc` infers `rootDir` as the common ancestor of every compiled file.
	// Because the build spans both the repo-root code folders (`components/`,
	// `charts/`, …) and the workspace entry files (`packages/design/*.ts`), that
	// ancestor is the repo root, so the entry files land in `dist/packages/design/`.
	// Those emitted barrels only re-export `../../components` (i.e. `dist/components`),
	// which is what `@reltio/design/components` already resolves to — nothing
	// references `dist/packages`, so drop it from the published artifact.
	const strayEntryDir = path.join(DIST, "packages");
	fs.rmSync(strayEntryDir, { recursive: true, force: true });

	console.log(
		`✓ bundled dist assets: index + ${schemaCount} schema(s) + bin (pruned dist/packages)`,
	);
};

main();
