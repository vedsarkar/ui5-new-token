#!/usr/bin/env node
/**
 * Build script for @reltio/auth.
 *
 * Emits dual ESM + CJS output from a single TypeScript source tree:
 *   dist/esm/   — ESM modules with .d.ts declarations
 *   dist/cjs/   — CommonJS modules (with dist/cjs/package.json type=commonjs
 *                 so Node treats the .js files there as CJS even though the
 *                 root package.json declares type=module)
 *
 * Both outputs are produced by separate `tsc` invocations against the matching
 * tsconfig.{esm,cjs}.json files in this package.
 */

import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pkgDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(pkgDir, "dist");

// Resolve `tsc` from the TypeScript version this package declares, not whatever
// got hoisted to the repo root. Node resolution walks up from the package, so a
// package-local typescript wins and the root copy is the fallback — keeping the
// compiler version deterministic and aligned with the declared devDependency
// across local builds and CI.
const tscBin = createRequire(import.meta.url).resolve("typescript/bin/tsc");

function step(name, fn) {
	process.stdout.write(`• ${name}... `);
	const start = Date.now();
	fn();
	process.stdout.write(`done (${Date.now() - start}ms)\n`);
}

function runTsc(configFile) {
	const result = spawnSync(
		process.execPath,
		[tscBin, "--project", configFile],
		{ cwd: pkgDir, stdio: "inherit" },
	);
	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}
}

step("clean dist/", () => {
	rmSync(distDir, { recursive: true, force: true });
	mkdirSync(distDir, { recursive: true });
});

step("compile ESM", () => {
	runTsc("tsconfig.esm.json");
});

step("compile CJS", () => {
	runTsc("tsconfig.cjs.json");
});

step("write dist/cjs/package.json", () => {
	writeFileSync(
		join(distDir, "cjs", "package.json"),
		`${JSON.stringify({ type: "commonjs" }, null, 2)}\n`,
	);
});

step("write dist/esm/package.json", () => {
	writeFileSync(
		join(distDir, "esm", "package.json"),
		`${JSON.stringify({ type: "module" }, null, 2)}\n`,
	);
});

// Stage the published manifest. The source package.json declares exports
// relative to the package root (e.g. "./dist/esm/types/index.js"), which
// is correct for in-repo workspace resolution. But `scripts/release.mjs`
// publishes from `dist/`, so the manifest that ends up at the tarball
// root must reference paths WITHOUT the leading `./dist/`. The same
// rewrite applies to `typesVersions` — its values are arrays of
// `.d.ts` paths that classic-resolver consumers will read. The `files`
// field — once we're inside `dist/`, listing "dist" makes no sense —
// is dropped, and dev-only fields (`scripts`, `devDependencies`) are
// stripped so they don't leak to consumers.
step("stage dist/package.json", () => {
	const source = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
	const rewritePath = (value) =>
		typeof value === "string" ? value.replace(/^\.\/dist\//, "./") : value;
	const rewriteEntry = (entry) => {
		if (typeof entry === "string") return rewritePath(entry);
		const next = {};
		for (const [condition, target] of Object.entries(entry)) {
			next[condition] = rewritePath(target);
		}
		return next;
	};
	const staged = { ...source };
	if (staged.exports) {
		const nextExports = {};
		for (const [subpath, entry] of Object.entries(staged.exports)) {
			nextExports[subpath] = rewriteEntry(entry);
		}
		staged.exports = nextExports;
	}
	if (staged.typesVersions) {
		const nextVersions = {};
		for (const [version, mapping] of Object.entries(staged.typesVersions)) {
			const nextMapping = {};
			for (const [subpath, paths] of Object.entries(mapping)) {
				nextMapping[subpath] = paths.map(rewritePath);
			}
			nextVersions[version] = nextMapping;
		}
		staged.typesVersions = nextVersions;
	}
	delete staged.scripts;
	delete staged.devDependencies;
	delete staged.files;
	writeFileSync(
		join(distDir, "package.json"),
		`${JSON.stringify(staged, null, "\t")}\n`,
	);
});

console.log("✓ @reltio/auth built successfully");
