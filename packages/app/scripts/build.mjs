#!/usr/bin/env node
/**
 * Build script for @reltio/app.
 *
 * The package ships no compiled code — only the scaffolding CLI and the app
 * template it renders. The build assembles a self-contained `dist/` that is
 * published as the package root (see `scripts/release.mjs`, which publishes
 * from `dist/`):
 *
 *   dist/bin/...            the `@reltio/app` CLI (cli.mjs + create.mjs + update.mjs)
 *   dist/app-template/...   the runnable Next.js template, dotfiles renamed to
 *                           publish-safe placeholders (restored by `create`)
 *   dist/package.json       staged manifest (dev-only fields stripped)
 *
 * Source and published layouts mirror each other: the template is a sibling of
 * the CLI's `bin/` in both (`packages/app/app-template` in-repo, staged to
 * `dist/app-template` on build), so the CLI resolves it the same way in each.
 */
import {
	cpSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pkgDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(pkgDir, "dist");
const templateSrc = join(pkgDir, "app-template");

/** Dev/run artifacts and secrets that must never enter the published template. */
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

/** Real dotfile → publish-safe placeholder. npm strips a real `.gitignore` from
 * a tarball and treats `.env.local.example` specially, so we stage them
 * underscore-prefixed; the CLI's `scaffold()` renames them back. */
const RENAME = {
	".gitignore": "_gitignore",
	".env.local.example": "_env.local.example",
};

const copyTemplate = (src, dest) => {
	mkdirSync(dest, { recursive: true });
	for (const entry of readdirSync(src, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const from = join(src, entry.name);
		const to = join(dest, RENAME[entry.name] ?? entry.name);
		if (entry.isDirectory()) copyTemplate(from, to);
		else cpSync(from, to);
	}
};

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

step("stage app-template/", () => {
	copyTemplate(templateSrc, join(distDir, "app-template"));
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

console.log("✓ @reltio/app built successfully");
