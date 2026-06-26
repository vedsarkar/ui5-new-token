/**
 * `install` subcommand — copy the bundled agent skill(s) into a consumer
 * repository so any agent (Cursor / Claude / Codex) can use them.
 *
 * Non-destructive by contract: it writes the skill under `.agents/skills/<name>`
 * (the canonical Agent Skills location) and links `.claude/skills/<name>` to it,
 * but it never deletes or recurses into content it does not own, and it never
 * edits the consumer's `AGENTS.md` / `CLAUDE.md` (it prints a suggested pointer
 * instead).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PKG_ROOT = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const SKILLS_SRC = path.join(PKG_ROOT, "skills");

/** Marker file the installer drops into every destination it owns. Ownership is
 * keyed off this sentinel — NOT off `SKILL.md`, which every skill has, so a
 * user-authored or otherwise-installed skill of the same name is never mistaken
 * for ours and never wiped. Re-installs refresh dirs carrying this marker. */
const OWNERSHIP_MARKER = ".reltio-skills-managed";
const markOwned = (dir) =>
	fs.writeFileSync(
		path.join(dir, OWNERSHIP_MARKER),
		"Managed by @reltio/skills — safe to update via `npx @reltio/skills install`.\nDelete this file to disown the directory.\n",
	);

/** Overlay-copy `src` onto `dest`: recursive, overwrites matching files, but
 * keeps unrelated content already present and never deletes. Safe for foreign
 * destinations — upholds this file's "never delete content it does not own". */
const overlayDir = (src, dest) => fs.cpSync(src, dest, { recursive: true });

/** Mirror `src` into `dest`: wipe `dest` first so files removed in a newer skill
 * version do not linger. Used ONLY for installer-owned destinations so updates
 * are always a clean snapshot of the current package version. */
const mirrorDir = (src, dest) => {
	fs.rmSync(dest, { recursive: true, force: true });
	fs.cpSync(src, dest, { recursive: true });
};

const isSymlink = (p) => {
	try {
		return fs.lstatSync(p).isSymbolicLink();
	} catch {
		return false;
	}
};

const ok = (message) => ({ level: "ok", message });
const warn = (message) => ({ level: "warn", message });

/** True when `dir` is a directory a previous run of this installer created,
 * detected by our `OWNERSHIP_MARKER` sentinel. Re-running over our own dir
 * updates it idempotently; a foreign dir (no marker) is treated as a conflict. */
const isOwnedCopy = (dir) => fs.existsSync(path.join(dir, OWNERSHIP_MARKER));

/** Link `.claude/skills/<name>` to the freshly installed `.agents/skills/<name>`,
 * resolving conflicts safely. Returns a `{ level, message }` status. */
const linkClaude = (skillName, agentsDest, force) => {
	const claudeSkillsDir = path.join(process.cwd(), ".claude", "skills");
	const claudeLink = path.join(claudeSkillsDir, skillName);
	fs.mkdirSync(claudeSkillsDir, { recursive: true });
	const relTarget = path.relative(claudeSkillsDir, agentsDest);

	const existing = fs.existsSync(claudeLink) || isSymlink(claudeLink);
	if (!existing) {
		try {
			fs.symlinkSync(relTarget, claudeLink);
			return ok("linked .claude/skills");
		} catch {
			overlayDir(agentsDest, claudeLink);
			return ok(
				"copied into .claude/skills (symlinks unavailable — re-run `npx @reltio/skills install` to update)",
			);
		}
	}

	if (isSymlink(claudeLink)) {
		const current = fs.readlinkSync(claudeLink);
		const resolved = path.resolve(claudeSkillsDir, current);
		if (resolved === agentsDest)
			return ok(".claude/skills link already correct");
		if (!force) {
			return warn(
				`.claude/skills/${skillName} points elsewhere — re-run with --force to replace`,
			);
		}
		fs.unlinkSync(claudeLink); // unlink the symlink only — no recursion
		fs.symlinkSync(relTarget, claudeLink);
		return ok("replaced conflicting .claude/skills link (--force)");
	}

	// A real directory/file (e.g. symlinks unavailable on this platform).
	if (isOwnedCopy(claudeLink)) {
		mirrorDir(agentsDest, claudeLink); // refresh our own copy cleanly, idempotent
		return ok("updated copied .claude/skills (symlinks unavailable)");
	}
	if (!force) {
		return warn(
			`.claude/skills/${skillName} is a foreign real path — resolve manually or re-run with --force`,
		);
	}
	// --force: install into the existing location WITHOUT deleting unrelated content.
	overlayDir(agentsDest, claudeLink);
	return ok(
		"copied into existing .claude/skills path (--force, unrelated files kept)",
	);
};

export const install = (args) => {
	const force = args.includes("--force");
	const requested = args.filter((a) => !a.startsWith("-"));
	if (!fs.existsSync(SKILLS_SRC)) {
		console.error(
			"No bundled skills found. This command must run from an installed @reltio/skills package.",
		);
		process.exit(1);
	}

	const available = fs
		.readdirSync(SKILLS_SRC, { withFileTypes: true })
		.filter((e) => e.isDirectory())
		.map((e) => e.name)
		.sort();
	if (available.length === 0) {
		console.error("No skills to install.");
		process.exit(1);
	}

	// No names → install every bundled skill; names → install only those.
	let names = available;
	if (requested.length > 0) {
		const unknown = requested.filter((n) => !available.includes(n));
		if (unknown.length > 0) {
			console.error(
				`Unknown skill(s): ${unknown.join(", ")}\nAvailable: ${available.join(", ")}`,
			);
			process.exit(1);
		}
		// De-duplicate while preserving the requested order.
		names = [...new Set(requested)];
	}

	const agentsSkillsDir = path.join(process.cwd(), ".agents", "skills");
	const installed = [];
	for (const name of names) {
		const src = path.join(SKILLS_SRC, name);
		const agentsDest = path.join(agentsSkillsDir, name);
		const exists = fs.existsSync(agentsDest);
		const owned = exists && isOwnedCopy(agentsDest);
		// A pre-existing `.agents/skills/<name>` that is NOT one of our own installs
		// (no ownership marker) is foreign content occupying the name — never wipe it.
		if (exists && !owned && !force) {
			installed.push({
				name,
				status: warn(
					`.agents/skills/${name} already exists and is not managed by @reltio/skills — resolve manually or re-run with --force`,
				),
			});
			continue;
		}
		if (owned || !exists) {
			// Our own copy or a fresh install → mirror a clean snapshot so files
			// dropped in a newer version don't linger.
			mirrorDir(src, agentsDest);
		} else {
			// Foreign + --force → overlay without deleting unrelated content, matching
			// the non-destructive `.claude` behaviour and this file's contract.
			overlayDir(src, agentsDest);
		}
		markOwned(agentsDest);
		const status = linkClaude(name, agentsDest, force);
		installed.push({ name, status });
	}

	const hasConflict = installed.some((s) => s.status.level === "warn");

	console.log(
		hasConflict
			? "Reltio skills — attention needed:\n"
			: "Installed Reltio skills:\n",
	);
	for (const s of installed) {
		const glyph = s.status.level === "warn" ? "⚠" : "✓";
		console.log(`  ${glyph} .agents/skills/${s.name}  (${s.status.message})`);
	}

	if (hasConflict) {
		console.log(
			"\nResolve the conflict(s) above (or re-run with --force), then re-run `npx @reltio/skills install`.",
		);
		process.exitCode = 1;
		return;
	}

	const pointers = installed.map(
		(s) => `  > See .agents/skills/${s.name} for the ${s.name} workflow.`,
	);
	console.log(
		[
			"",
			"Suggested pointer(s) for your AGENTS.md / CLAUDE.md (add manually):",
			...pointers,
		].join("\n"),
	);
};
