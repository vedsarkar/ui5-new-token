#!/usr/bin/env node
/**
 * Stage the publishable assets for `@reltio/create-app`.
 *
 * The app is authored as a standalone, runnable project at the repo root
 * (`app-template/`, package `@reltio/app`). This script — run automatically by
 * the `prepack` lifecycle on `npm pack` / `npm publish` — copies that app into
 * a bundled `app-template/` next to the CLI, renaming dotfiles to the
 * underscore-prefixed placeholders that survive npm publish (the CLI's
 * `scaffold()` renames them back). It also stages the root LICENSE / NOTICE.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "..", "..");
const SOURCE = path.join(REPO_ROOT, "app-template");
const TEMPLATE = path.join(HERE, "app-template");

/** Never copy dev/run artifacts or secrets into the published template. */
const SKIP = new Set([
	"node_modules",
	".next",
	".env.local",
	"next-env.d.ts",
	"package-lock.json",
	".DS_Store",
	"tsconfig.tsbuildinfo",
	".git",
]);

/** Real dotfile → publish-safe placeholder (restored by scaffold()). */
const RENAME = {
	".gitignore": "_gitignore",
	".env.local.example": "_env.local.example",
};

function copyDir(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const from = path.join(src, entry.name);
		const to = path.join(dest, RENAME[entry.name] ?? entry.name);
		if (entry.isDirectory()) copyDir(from, to);
		else fs.copyFileSync(from, to);
	}
}

if (!fs.existsSync(SOURCE)) {
	console.error(`✗ Source app not found at ${SOURCE}`);
	process.exit(1);
}

fs.rmSync(TEMPLATE, { recursive: true, force: true });
copyDir(SOURCE, TEMPLATE);

for (const file of ["LICENSE", "NOTICE"]) {
	fs.copyFileSync(path.join(REPO_ROOT, file), path.join(HERE, file));
}

console.log("✓ Staged @reltio/create-app app-template from app-template/");
