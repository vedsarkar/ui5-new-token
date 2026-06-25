#!/usr/bin/env node
import { execSync } from "node:child_process";

// Point git at the repo's tracked hooks directory so the prepare-commit-msg
// hook (which prepends the Jira issue key from the branch name) is active for
// everyone after `npm install`. No-ops outside a git work tree (e.g. CI
// installing from a tarball) so it never breaks an install.

try {
	execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
} catch {
	process.exit(0);
}

try {
	execSync("git config core.hooksPath .githooks", { stdio: "ignore" });
} catch {
	// Activating the hook is a convenience, not a hard requirement — ignore.
}
