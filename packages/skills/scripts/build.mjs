#!/usr/bin/env node
/**
 * Build script for @reltio/skills.
 *
 * The package ships no compiled code — only the agent-skill sources and the
 * installer CLI. The build assembles a self-contained `dist/` that is published
 * as the package root (see `scripts/release.mjs`, which publishes from `dist/`):
 *
 *   dist/bin/...           the `@reltio/skills` CLI (cli.mjs + install.mjs)
 *   dist/skills/<name>/    bundled agent skill(s)
 *   dist/package.json      staged manifest (dev-only fields stripped)
 *
 * The CLI resolves `skills/` relative to its own location, so the same code path
 * works in-repo (packages/skills) and from the published package (dist).
 */
import {
	cpSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pkgDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(pkgDir, "dist");

const step = (name, fn) => {
	process.stdout.write(`• ${name}... `);
	const start = Date.now();
	fn();
	process.stdout.write(`done (${Date.now() - start}ms)\n`);
};

step("clean dist/", () => {
	rmSync(distDir, { recursive: true, force: true });
	mkdirSync(distDir, { recursive: true });
});

step("copy bin/", () => {
	cpSync(join(pkgDir, "bin"), join(distDir, "bin"), { recursive: true });
});

step("copy skills/", () => {
	cpSync(join(pkgDir, "skills"), join(distDir, "skills"), { recursive: true });
});

// Stage the published manifest. The `bin` paths already resolve correctly from
// the `dist/` root. Dev-only fields (`scripts`, `devDependencies`) are stripped
// so they never leak to consumers, and `files` is dropped because — once we're
// inside `dist/` (the publish root) — listing "dist" makes no sense.
step("stage dist/package.json", () => {
	const source = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
	const staged = { ...source };
	delete staged.scripts;
	delete staged.devDependencies;
	delete staged.files;
	writeFileSync(
		join(distDir, "package.json"),
		`${JSON.stringify(staged, null, "\t")}\n`,
	);
});

console.log("✓ @reltio/skills built successfully");
