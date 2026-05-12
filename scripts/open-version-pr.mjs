#!/usr/bin/env node
/**
 * Open a Bitbucket pull request for the `release/version-*` branch produced
 * by the `version @reltio packages` custom pipeline.
 *
 * Why a script and not an inline `curl` line?
 *   We want a structured PR description (list of bumped packages, post-merge
 *   instructions) and a readable pipeline YAML. The script also degrades
 *   gracefully when the API token is missing — the pipeline still succeeds,
 *   and a maintainer can open the PR by hand using the printed fallback URL.
 *
 * Behaviour
 *   $BITBUCKET_PR_TOKEN missing → log fallback URL, exit 0.
 *   PR successfully opened      → log PR URL, exit 0.
 *   PR already exists on branch → log existing-PR URL, exit 0.
 *   Any other API failure       → log error + fallback URL, exit 1.
 *
 * Required environment
 *   $BITBUCKET_WORKSPACE    Auto-injected by Bitbucket Pipelines.
 *   $BITBUCKET_REPO_SLUG    Auto-injected by Bitbucket Pipelines.
 *   $VERSION_BRANCH         Source branch (release/version-…).
 *
 * Optional environment
 *   $BITBUCKET_PR_TOKEN     Repository Access Token, scope `pullrequest:write`.
 *                           Without it, auto-PR is silently skipped.
 *   $VERSION_BASE_BRANCH    Defaults to `main`.
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const {
	BITBUCKET_WORKSPACE,
	BITBUCKET_REPO_SLUG,
	BITBUCKET_PR_TOKEN,
	VERSION_BRANCH,
	VERSION_BASE_BRANCH = "main",
} = process.env;

if (!BITBUCKET_WORKSPACE || !BITBUCKET_REPO_SLUG || !VERSION_BRANCH) {
	console.error(
		"✗ Missing required env vars (need BITBUCKET_WORKSPACE, BITBUCKET_REPO_SLUG, VERSION_BRANCH).",
	);
	process.exit(1);
}

const fallbackUrl =
	`https://bitbucket.org/${BITBUCKET_WORKSPACE}/${BITBUCKET_REPO_SLUG}` +
	`/pull-requests/new?source=${encodeURIComponent(VERSION_BRANCH)}` +
	`&dest=${encodeURIComponent(VERSION_BASE_BRANCH)}`;

if (!BITBUCKET_PR_TOKEN) {
	console.log("↷ Auto-PR creation skipped — $BITBUCKET_PR_TOKEN is not set.");
	console.log(
		"  Maintainer setup steps live in `guides/release-process.story.mdx`",
	);
	console.log('  → section "Maintainer setup".');
	console.log(`  Open the PR manually: ${fallbackUrl}`);
	process.exit(0);
}

const bumpedPackages = (() => {
	try {
		const diff = execSync(
			`git diff --name-only origin/${VERSION_BASE_BRANCH}..HEAD -- 'packages/*/package.json'`,
			{ encoding: "utf8" },
		).trim();
		if (!diff) return [];
		return diff.split("\n").map((path) => {
			const pkg = JSON.parse(readFileSync(path, "utf8"));
			return { name: pkg.name, version: pkg.version };
		});
	} catch (err) {
		console.warn(`  Could not enumerate bumped packages: ${err.message}`);
		return [];
	}
})();

const packagesSection = bumpedPackages.length
	? `### Packages versioned in this PR\n\n${bumpedPackages
			.map(({ name, version }) => `- \`${name}@${version}\``)
			.join("\n")}`
	: "### Packages versioned in this PR\n\n_None — this run only consumed empty changesets._";

const description = [
	"This PR was opened automatically by the `version @reltio packages` pipeline.",
	"",
	"### What this PR does",
	"",
	"- Consumes pending changesets under `.changeset/`",
	"- Bumps versions in `packages/*/package.json`",
	"- Writes release notes to `packages/*/CHANGELOG.md`",
	"",
	packagesSection,
	"",
	"### After merge",
	"",
	"The `branches: main` pipeline runs automatically. It launches `test`, `chromatic`, `vercel`, and `release-packages` in parallel — `release-packages` publishes the bumped versions to npm and creates git tags. No further manual triggers are needed.",
	"",
	"If the auto-release fails (npm outage, build flake, …), re-trigger it from **Run pipeline → `custom: release @reltio packages`** against `main`. The script is idempotent — already-published versions are skipped.",
].join("\n");

const apiUrl = `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${BITBUCKET_REPO_SLUG}/pullrequests`;

const response = await fetch(apiUrl, {
	method: "POST",
	headers: {
		// Repository Access Tokens authenticate via `Bearer <token>` on the
		// Bitbucket REST API. `Basic x-token-auth:<token>` works for git
		// over HTTPS but is rejected (401) by the REST API.
		Authorization: `Bearer ${BITBUCKET_PR_TOKEN}`,
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		title: "chore: version @reltio packages",
		source: { branch: { name: VERSION_BRANCH } },
		destination: { branch: { name: VERSION_BASE_BRANCH } },
		description,
		close_source_branch: true,
	}),
});

if (response.ok) {
	const data = await response.json();
	console.log(`✓ Pull request opened: ${data.links.html.href}`);
	process.exit(0);
}

const errorText = await response.text();

if (response.status === 400 && /already exists/i.test(errorText)) {
	const listUrl = `https://bitbucket.org/${BITBUCKET_WORKSPACE}/${BITBUCKET_REPO_SLUG}/pull-requests?query=source:${encodeURIComponent(VERSION_BRANCH)}`;
	console.log(`↷ A pull request already exists for ${VERSION_BRANCH}.`);
	console.log(`  Find it here: ${listUrl}`);
	process.exit(0);
}

if (response.status === 401 || response.status === 403) {
	console.error(`✗ Auth rejected by Bitbucket API (${response.status}).`);
	console.error("  Likely causes:");
	console.error(
		"  - $BITBUCKET_PR_TOKEN is not a Repository Access Token (App Passwords need a different scheme).",
	);
	console.error("  - Token is missing the `pullrequest:write` scope.");
	console.error("  - Token was revoked or expired.");
	console.error(`  Open the PR manually: ${fallbackUrl}`);
	process.exit(1);
}

let summary = `${response.status} ${response.statusText}`;
try {
	const parsed = JSON.parse(errorText);
	if (parsed.error?.message) summary += ` — ${parsed.error.message}`;
} catch {
	if (errorText) summary += `\n${errorText}`;
}

console.error(`✗ Failed to open PR: ${summary}`);
console.error(`  Open the PR manually: ${fallbackUrl}`);
process.exit(1);
