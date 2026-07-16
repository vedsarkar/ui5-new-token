/**
 * `create` subcommand — scaffold a runnable Next.js App Router app wired to
 * `@reltio/design` and `@reltio/auth` into a new directory.
 *
 *   npx @reltio/app create my-app
 *   npx @reltio/app create            # prompts for the name
 *
 * The v1 template is auth-focused: real Reltio login/logout, route gating, and
 * a protected page showing the signed-in user + tenants. It is copied verbatim
 * (dev/run artifacts skipped, publish-safe dotfile placeholders restored) and
 * its `package.json` name is rewritten to the chosen app name.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const BIN_DIR = path.dirname(fileURLToPath(import.meta.url));
// The template sits next to the CLI in both layouts — `packages/app/app-template`
// in the source monorepo (the one `npm run app-template` serves) and
// `dist/app-template` in the published package (staged there by scripts/build.mjs).
// So a single relative resolution works everywhere; `create` is offline and
// self-contained.
const TEMPLATE_DIR = path.resolve(BIN_DIR, "..", "app-template");

/** npm package-name grammar (scoped or unscoped). */
const NAME_RE = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

/** Files/dirs that must never be copied into a generated app — they are
 * created by running the template in place (`npm run app-template`) and would
 * pollute a fresh scaffold. */
const SKIP = new Set([
	"node_modules",
	".next",
	".env.local",
	"next-env.d.ts",
	"package-lock.json",
	".DS_Store",
	"tsconfig.tsbuildinfo",
]);

/** Publish-safe placeholder → final name. npm drops a real `.gitignore` from a
 * published tarball and treats `.env.local.example` specially, so the bundled
 * template stores them underscore-prefixed (see scripts/build.mjs) and we
 * restore the real name here. Running from the repo-root source, the files are
 * already real, so these keys simply don't match — a harmless no-op. */
const RENAME = {
	_gitignore: ".gitignore",
	"_env.local.example": ".env.local.example",
};

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

function copyDir(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const srcPath = path.join(src, entry.name);
		const outName = RENAME[entry.name] ?? entry.name;
		const destPath = path.join(dest, outName);
		if (entry.isDirectory()) copyDir(srcPath, destPath);
		else fs.copyFileSync(srcPath, destPath);
	}
}

/**
 * Render the template into `targetDir`, naming the app `appName`.
 *
 * @param {{ templateDir: string, targetDir: string, appName: string }} options
 */
export function scaffold({ templateDir, targetDir, appName }) {
	copyDir(templateDir, targetDir);

	const pkgPath = path.join(targetDir, "package.json");
	const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
	pkg.name = appName;
	fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

	// Default BASE_PATH to the app name (scope stripped) so the scaffold runs
	// under a sensible sub-path out of the box; the user can change it in
	// .env.local before starting.
	const envExamplePath = path.join(targetDir, ".env.local.example");
	if (fs.existsSync(envExamplePath)) {
		const basePathName = appName.replace(/^@[^/]+\//, "");
		const env = fs.readFileSync(envExamplePath, "utf8");
		fs.writeFileSync(
			envExamplePath,
			env.replace(/^BASE_PATH=.*$/m, `BASE_PATH=/${basePathName}`),
		);
	}
}

export async function create(args) {
	const positional = args.filter((a) => !a.startsWith("-"));
	let appName = positional[0];
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
