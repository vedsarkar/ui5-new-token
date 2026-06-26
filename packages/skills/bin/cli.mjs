#!/usr/bin/env node
/**
 * `@reltio/skills` CLI — a single dispatcher so `npx @reltio/skills <subcommand>`
 * resolves (the bin is keyed to the package's unscoped name `skills`).
 *
 * Subcommands:
 *   install [name...]   Install bundled agent skill(s) into a consumer repo —
 *                       every skill when no name is given, or only the named ones.
 *   list                List the bundled skills and their descriptions.
 *
 * The skill sources it reads (`skills/<name>/...`) are bundled next to this file
 * in the published package, so installation is offline and self-contained.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PKG_ROOT = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const SKILLS_SRC = path.join(PKG_ROOT, "skills");

/** Read the `description:` field from a skill's `SKILL.md` YAML frontmatter. */
const readDescription = (name) => {
	const skillMd = path.join(SKILLS_SRC, name, "SKILL.md");
	if (!fs.existsSync(skillMd)) return "";
	const text = fs.readFileSync(skillMd, "utf8");
	const frontmatter = text.match(/^---\s*([\s\S]*?)\s*---/);
	if (!frontmatter) return "";
	const match = frontmatter[1].match(/^description:\s*(.+)$/m);
	return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
};

const listSkills = () => {
	if (!fs.existsSync(SKILLS_SRC)) {
		console.error(
			"No bundled skills found. This command must run from an installed @reltio/skills package.",
		);
		process.exit(1);
	}
	const names = fs
		.readdirSync(SKILLS_SRC, { withFileTypes: true })
		.filter((e) => e.isDirectory())
		.map((e) => e.name)
		.sort();
	console.log(`@reltio/skills — ${names.length} skill(s)\n`);
	const width = names.reduce((max, n) => Math.max(max, n.length), 0);
	for (const name of names) {
		console.log(`  ${name.padEnd(width)}  ${readDescription(name)}`);
	}
	console.log(
		"\nInstall all:  npx @reltio/skills install\nInstall one:  npx @reltio/skills install <name>",
	);
};

const HELP = `@reltio/skills CLI

Usage:
  npx @reltio/skills install [name...]   Install agent skill(s) into this repo (all when no name given)
  npx @reltio/skills list                List the bundled skills

Flags:
  --force   Replace a conflicting .claude/skills entry`;

const main = async () => {
	const [, , subcommand, ...rest] = process.argv;
	switch (subcommand) {
		case "install": {
			const { install } = await import("./install.mjs");
			install(rest);
			break;
		}
		case "list":
			listSkills();
			break;
		case undefined:
		case "-h":
		case "--help":
			console.log(HELP);
			break;
		default:
			console.error(`Unknown command "${subcommand}".\n\n${HELP}`);
			process.exit(1);
	}
};

main();
