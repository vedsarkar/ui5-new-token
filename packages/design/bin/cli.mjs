#!/usr/bin/env node
/**
 * `@reltio/design` CLI — a single dispatcher so `npx @reltio/design <subcommand>`
 * resolves (the bin is keyed to the package's unscoped name `design`).
 *
 * Subcommands:
 *   components [Name]   Print the endorsed-component inventory, or one
 *                       component's resolved props from the bundled schema.
 *
 * The assets it reads (`components.index.json`, `schemas/`) are bundled next to
 * this file in the published package, so discovery is offline and version-matched
 * to the installed `@reltio/design`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PKG_ROOT = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

/** Collapse a multi-line markdown description into one scannable line, trimmed
 * to a sane length. The CLI is a discovery aid, not full docs — agents follow
 * the footer pointer to the package types for exhaustive detail. */
const MAX_DESCRIPTION = 220;
const compact = (text) => {
	const oneLine = text.replace(/\s+/g, " ").trim();
	return oneLine.length > MAX_DESCRIPTION
		? `${oneLine.slice(0, MAX_DESCRIPTION - 1).trimEnd()}…`
		: oneLine;
};

const loadIndex = () => {
	const indexPath = path.join(PKG_ROOT, "components.index.json");
	if (!fs.existsSync(indexPath)) {
		console.error(
			"Component index not found. This command must run from an installed @reltio/design package.",
		);
		process.exit(1);
	}
	return readJson(indexPath);
};

const printInventory = () => {
	const { components } = loadIndex();
	const width = components.reduce((max, c) => Math.max(max, c.name.length), 0);
	console.log(`@reltio/design — ${components.length} endorsed components\n`);
	for (const c of components) {
		const name = c.name.padEnd(width);
		console.log(`  ${name}  ${c.description ?? ""}`);
	}
	console.log(
		`\nInspect one: npx @reltio/design components <Name>\nImport from:  "@reltio/design/components" (charts from "@reltio/design/charts")`,
	);
};

const printComponent = (name) => {
	const { components } = loadIndex();
	const entry = components.find(
		(c) => c.name.toLowerCase() === name.toLowerCase(),
	);
	if (!entry) {
		console.error(
			`Unknown component "${name}". Run \`npx @reltio/design components\` to list all.`,
		);
		process.exit(1);
	}
	const schemaPath = path.join(
		PKG_ROOT,
		"schemas",
		`${entry.name}.schema.json`,
	);
	console.log(
		`${entry.name}  —  import { ${entry.name} } from "${entry.import}"`,
	);
	if (entry.description) console.log(`\n${entry.description}`);
	if (!fs.existsSync(schemaPath)) {
		console.log(
			"\nNo bundled prop schema. Read props from the package types (.d.ts) or the Reltio Design MCP.",
		);
		return;
	}
	const schema = readJson(schemaPath);
	const props = schema.properties ?? {};
	const names = Object.keys(props);
	console.log(`\nProps (${names.length}):\n`);
	const width = names.reduce((max, n) => Math.max(max, n.length), 0);
	for (const propName of names) {
		const prop = props[propName];
		const type = prop["x-typescriptType"] ?? prop.type ?? "";
		const dflt =
			prop.default !== undefined
				? `  (default: ${JSON.stringify(prop.default)})`
				: "";
		const deprecated = prop.deprecated
			? `  [deprecated${
					prop["x-deprecationReason"]
						? `: ${compact(prop["x-deprecationReason"])}`
						: ""
				}]`
			: "";
		console.log(`  ${propName.padEnd(width)}  ${type}${dflt}${deprecated}`);
		if (prop.description) {
			console.log(`  ${" ".repeat(width)}  ${compact(prop.description)}`);
		}
	}
	console.log(
		"\nTypes shown are the resolved TypeScript signatures. For the full shape of named types (enums, `*AccessibilityAttributes`, event payloads), read the bundled declarations in node_modules/@reltio/design or use the Reltio Design MCP.",
	);
};

const componentsCommand = (args) => {
	const name = args[0];
	if (name) printComponent(name);
	else printInventory();
};

const HELP = `@reltio/design CLI

Usage:
  npx @reltio/design components [Name]   List endorsed components, or show one component's props`;

const main = () => {
	const [, , subcommand, ...rest] = process.argv;
	switch (subcommand) {
		case "components":
			componentsCommand(rest);
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
