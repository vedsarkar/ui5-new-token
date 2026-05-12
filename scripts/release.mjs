#!/usr/bin/env node
/**
 * Release wrapper for the Reltio Design Platform monorepo.
 *
 * Why a custom script instead of `changeset publish`?
 *   Each publishable package in this repo is built with `tsc` into its own
 *   `dist/` directory, and `postbuild` copies the package's `package.json`
 *   (with the version that `changeset version` has just bumped) into that
 *   `dist/`. Publication happens from `dist/`, not from the package root.
 *   `changeset publish` runs `npm publish` from each package directory,
 *   which would publish the source instead of the build artifacts.
 *   This script iterates the same workspace packages, but publishes from
 *   their `dist/` subdirectories and creates matching git tags.
 *
 * Modes:
 *   --release            Stable release. Publishes each package whose
 *                        version is not yet on the npm registry, then
 *                        creates an annotated git tag `<name>@<version>`
 *                        and pushes it. Default mode.
 *   --snapshot --tag X   Snapshot release. Skips registry check, skips
 *                        git tagging, publishes under dist-tag X.
 *   --dry-run            Print what would be published without doing it.
 *
 * Usage:
 *   npm run release
 *   npm run release:snapshot -- --tag pr-123
 *   node scripts/release.mjs --dry-run
 */

import { execSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PACKAGES_DIR = join(ROOT, "packages");

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const argValue = (name) => {
	const idx = args.indexOf(`--${name}`);
	return idx === -1 ? undefined : args[idx + 1];
};

const isSnapshot = flag("snapshot");
const distTag = argValue("tag");
const isDryRun = flag("dry-run");

if (isSnapshot && !distTag) {
	console.error("✗ --snapshot requires --tag <name> (e.g. pr-123, next, beta)");
	process.exit(1);
}

const publishableWorkspaces = readdirSync(PACKAGES_DIR)
	.map((name) => join(PACKAGES_DIR, name))
	.filter((dir) => statSync(dir).isDirectory())
	.map((dir) => {
		const manifestPath = join(dir, "package.json");
		if (!existsSync(manifestPath)) return null;
		const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
		if (manifest.private) return null;
		return { dir, manifest };
	})
	.filter(Boolean);

if (publishableWorkspaces.length === 0) {
	console.error("✗ No publishable workspace found under packages/*");
	process.exit(1);
}

const isVersionPublished = (name, version) => {
	const result = spawnSync(
		"npm",
		["view", `${name}@${version}`, "version", "--json"],
		{ encoding: "utf8" },
	);
	return result.status === 0 && result.stdout.trim().length > 0;
};

const run = (cmd, opts = {}) => {
	console.log(`$ ${cmd}`);
	if (isDryRun) return "";
	return execSync(cmd, { stdio: "inherit", ...opts });
};

const tagsPushed = [];

for (const { dir, manifest } of publishableWorkspaces) {
	const { name, version } = manifest;
	const distDir = join(dir, "dist");

	if (!existsSync(distDir)) {
		console.error(
			`✗ ${name}: ${distDir} does not exist. Run \`npm run build\` for the workspace first.`,
		);
		process.exit(1);
	}

	if (!existsSync(join(distDir, "package.json"))) {
		console.error(
			`✗ ${name}: ${distDir}/package.json is missing. Check the postbuild step.`,
		);
		process.exit(1);
	}

	const distManifest = JSON.parse(
		readFileSync(join(distDir, "package.json"), "utf8"),
	);
	if (distManifest.version !== version) {
		console.error(
			`✗ ${name}: version mismatch — source package.json says ${version}, dist/package.json says ${distManifest.version}. Rebuild first.`,
		);
		process.exit(1);
	}

	if (!isSnapshot && isVersionPublished(name, version)) {
		console.log(
			`↷ ${name}@${version} is already published. Skipping (no changeset → no version bump).`,
		);
		continue;
	}

	const publishTag = distTag ? `--tag ${distTag}` : "";
	console.log(
		`\n→ Publishing ${name}@${version}${distTag ? ` under dist-tag ${distTag}` : ""}`,
	);
	run(`npm publish ${publishTag}`.trim(), { cwd: distDir });

	if (!isSnapshot) {
		const tag = `${name}@${version}`;
		run(`git tag -a "${tag}" -m "Release ${tag}"`);
		tagsPushed.push(tag);
	}
}

if (tagsPushed.length > 0) {
	run("git push --follow-tags");
	console.log(`\n✓ Published and tagged: ${tagsPushed.join(", ")}`);
} else if (isSnapshot) {
	console.log(`\n✓ Snapshot publish complete (dist-tag: ${distTag}).`);
} else {
	console.log("\n✓ Nothing to publish. All workspace versions already on npm.");
}
