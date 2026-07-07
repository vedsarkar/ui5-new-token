#!/usr/bin/env node
/**
 * Reltio Design Platform — SAP Fiori icon re-export generator.
 *
 * Enumerates every default-collection icon in `@ui5/webcomponents-icons/dist/`
 * and emits a tree-shakable module under `icons/sap/<kebab-name>.tsx` that:
 *   1. side-effect-imports the UI5 icon data module, and
 *   2. exports a PascalCase React component rendering `<Icon name="<kebab>" />`.
 *
 * Compiled output publishes at `dist/icons/sap/<kebab-name>.js`.
 *
 * Run: npm run build-sap-icons
 */

import { spawnSync } from "node:child_process";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { renderSapIconModule } from "./icon-module-codegen.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const UI5_ICONS_DIST = join(ROOT, "node_modules/@ui5/webcomponents-icons/dist");
const OUT_DIR = join(ROOT, "icons/sap");
const OUT_REL = "icons/sap";

/** Skip non-per-icon aggregate modules if they appear in future UI5 releases. */
const SKIP_STEMS = new Set(["all-icons", "generated"]);

async function build() {
	const files = (await readdir(UI5_ICONS_DIST, { withFileTypes: true }))
		.filter(
			(entry) =>
				entry.isFile() &&
				entry.name.endsWith(".js") &&
				!/^[A-Z]/.test(entry.name),
		)
		.map((entry) => entry.name.replace(/\.js$/, ""))
		.filter((stem) => !SKIP_STEMS.has(stem))
		.sort((a, b) => a.localeCompare(b));

	if (files.length === 0) {
		throw new Error(`No icon modules found in ${UI5_ICONS_DIST}.`);
	}

	await mkdir(OUT_DIR, { recursive: true });
	for (const entry of await readdir(OUT_DIR)) {
		if (entry.endsWith(".tsx")) {
			await rm(join(OUT_DIR, entry), { force: true });
		}
	}

	for (const name of files) {
		await writeFile(
			join(OUT_DIR, `${name}.tsx`),
			renderSapIconModule({ kebabName: name }),
			"utf8",
		);
	}

	// Generated code is committed and linted in CI — apply Biome's formatter and
	// safe fixes (import order, line wrapping) so the output is conformant
	// regardless of the icon data.
	const biomeEntry = join(ROOT, "node_modules/@biomejs/biome/bin/biome");
	const biome = spawnSync(
		process.execPath,
		[biomeEntry, "check", "--write", OUT_DIR],
		{
			stdio: "inherit",
		},
	);
	if (biome.status !== 0) {
		throw new Error("Biome could not format the generated SAP icon files.");
	}

	// eslint-disable-next-line no-console
	console.log(
		`build-sap-icons: generated ${files.length} modules -> ${OUT_REL}/`,
	);
}

build().catch((error) => {
	// eslint-disable-next-line no-console
	console.error(`build-sap-icons failed: ${error.message}`);
	process.exit(1);
});
