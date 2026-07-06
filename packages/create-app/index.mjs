#!/usr/bin/env node
/**
 * `@reltio/create-app` CLI.
 *
 * Scaffolds a runnable Next.js App Router starter wired to `@reltio/design`
 * and `@reltio/auth`. Invoked as:
 *
 *   npm create @reltio/app my-app
 *   npx @reltio/create-app my-app
 *
 * The template (auth-focused for v1: real Reltio login/logout, route gating,
 * and a protected page showing the signed-in user + tenants) is bundled next
 * to this file and copied via the shared `scaffold()` helper.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { scaffold } from "./scaffold.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// Published packages carry a bundled `app-template/` (staged at prepack). In
// the source monorepo that folder does not exist, so fall back to the
// standalone `app-template/` at the repo root.
const BUNDLED_TEMPLATE = path.join(HERE, "app-template");
const SOURCE_TEMPLATE = path.resolve(HERE, "..", "..", "app-template");
const TEMPLATE_DIR = fs.existsSync(BUNDLED_TEMPLATE)
	? BUNDLED_TEMPLATE
	: SOURCE_TEMPLATE;

/** npm package-name grammar (scoped or unscoped). */
const NAME_RE = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

function ask(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

function detectPackageManager() {
	const ua = process.env.npm_config_user_agent ?? "";
	if (ua.startsWith("pnpm")) return "pnpm";
	if (ua.startsWith("yarn")) return "yarn";
	if (ua.startsWith("bun")) return "bun";
	return "npm";
}

async function main() {
	let appName = process.argv[2];
	if (!appName) {
		appName = await ask("App name: ");
	}
	if (!appName || !NAME_RE.test(appName)) {
		console.error(
			`✗ Invalid app name: "${appName}". Use a valid npm package name (e.g. my-reltio-app).`,
		);
		process.exit(1);
	}

	const targetDir = path.resolve(process.cwd(), appName);
	if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
		console.error(`✗ Directory "${appName}" already exists and is not empty.`);
		process.exit(1);
	}

	console.log(`\nCreating a Reltio app in ${targetDir} ...`);
	scaffold({ templateDir: TEMPLATE_DIR, targetDir, appName });

	const pm = detectPackageManager();
	const install =
		(await ask(`Install dependencies with ${pm}? (Y/n) `)).toLowerCase() !==
		"n";
	if (install) {
		const res = spawnSync(pm, ["install"], {
			cwd: targetDir,
			stdio: "inherit",
		});
		if (res.status !== 0) {
			console.error(
				"! Dependency install failed — you can run it manually later.",
			);
		}
	}

	const gitInit =
		(await ask("Initialize a git repository? (Y/n) ")).toLowerCase() !== "n";
	if (gitInit) {
		spawnSync("git", ["init"], { cwd: targetDir, stdio: "ignore" });
	}

	console.log("\n✅ Done! Next steps:\n");
	console.log(`  cd ${appName}`);
	if (!install) console.log(`  ${pm} install`);
	console.log(
		"  cp .env.local.example .env.local   # then fill OAUTH_PATH, LOGIN_PATH, CLIENT_ID, CLIENT_SECRET",
	);
	console.log(`  ${pm} run dev\n`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
