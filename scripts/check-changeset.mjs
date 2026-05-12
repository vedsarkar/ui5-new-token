#!/usr/bin/env node
/**
 * Pull-request CI guard.
 *
 * Fails the build if a PR touches source code under `packages/*` but does
 * not add a corresponding changeset. Configuration (package.json,
 * tsconfig, README, lockfile) and documentation-only changes are exempt,
 * so version-pump and metadata PRs do not trigger the check.
 *
 * Authors can intentionally opt out by adding an empty changeset:
 *   npm run changeset -- --empty
 *
 * Exit codes:
 *   0 — no changeset required, or a changeset is present
 *   1 — changeset required but missing
 *
 * Designed to run inside `bitbucket-pipelines.yml` against the PR's
 * merge base with origin/main. Locally:
 *   node scripts/check-changeset.mjs
 */

import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const BASE_REF = process.env.CHANGESET_BASE_REF || "origin/main";

const EXEMPT_FILENAMES = new Set([
	"package.json",
	"package-lock.json",
	"tsconfig.json",
	"README.md",
	"CHANGELOG.md",
	".npmignore",
]);

const isSourceChange = (path) => {
	if (!path.startsWith("packages/")) return false;
	const filename = path.split("/").pop() ?? "";
	if (EXEMPT_FILENAMES.has(filename)) return false;
	if (filename.startsWith(".")) return false;
	return true;
};

const changedFiles = (() => {
	try {
		// Catch every path the contributor might have touched:
		//  • `git diff --name-only <base>` returns committed-on-branch *and*
		//    unstaged working-tree changes vs the base ref, in one shot.
		//  • `git ls-files --others --exclude-standard` adds untracked files
		//    (e.g. a freshly generated `.changeset/*.md`) that `git diff`
		//    doesn't yet know about.
		const tracked = execSync(`git diff --name-only ${BASE_REF}`, {
			cwd: ROOT,
			encoding: "utf8",
		});
		const untracked = execSync("git ls-files --others --exclude-standard", {
			cwd: ROOT,
			encoding: "utf8",
		});
		return [...new Set([...tracked.split("\n"), ...untracked.split("\n")])]
			.map((s) => s.trim())
			.filter(Boolean);
	} catch (e) {
		console.error(`✗ Could not run \`git diff\` against ${BASE_REF}.`);
		console.error(
			"  Make sure the base ref is fetched (e.g. `git fetch origin main`).",
		);
		console.error(e.message);
		process.exit(1);
	}
})();

const sourceChanged = changedFiles.some(isSourceChange);

if (!sourceChanged) {
	console.log(
		"↷ No source files under packages/* changed since",
		BASE_REF,
		"— changeset not required.",
	);
	process.exit(0);
}

const newChangesets = (() => {
	try {
		return readdirSync(resolve(ROOT, ".changeset"))
			.filter((name) => name.endsWith(".md"))
			.filter((name) => name !== "README.md")
			.filter((name) => {
				const path = `.changeset/${name}`;
				return changedFiles.includes(path);
			});
	} catch {
		return [];
	}
})();

if (newChangesets.length === 0) {
	console.error(
		"✗ Source files under packages/* changed since",
		BASE_REF,
		"but no changeset was added.",
	);
	console.error("");
	console.error("Files that triggered this check:");
	for (const file of changedFiles.filter(isSourceChange)) {
		console.error(`  - ${file}`);
	}
	console.error("");
	console.error("To fix:");
	console.error(
		"  • Run `npm run changeset` and commit the generated .changeset/*.md file.",
	);
	console.error(
		"  • Or `npm run changeset -- --empty` to record an intentional no-version-bump.",
	);
	console.error(
		"  • See CONTRIBUTING.md → Adding a changeset for the full guide.",
	);
	process.exit(1);
}

console.log(
	`✓ Found ${newChangesets.length} changeset(s) for this PR: ${newChangesets.join(", ")}`,
);
process.exit(0);
