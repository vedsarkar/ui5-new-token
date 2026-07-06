/**
 * Shared scaffolding logic for `@reltio/create-app`.
 *
 * Copies the app-template into a target directory, skipping the dev-time
 * artifacts that a local `next dev` run leaves behind, restoring the dotfile
 * placeholders npm would otherwise strip on publish, and rewriting the
 * generated app's `package.json` name. The source is the bundled
 * `app-template/` in a published package, or the standalone `app-template/`
 * at the repo root during in-repo development.
 */

import fs from "node:fs";
import path from "node:path";

/** Files/dirs that must never be copied into a generated app — they are
 * created by running the template in place (`npm run template`) and would
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

/** Placeholder → final name. npm drops a real `.gitignore` from a published
 * tarball and treats `.env.local.example` specially, so the template stores
 * them underscore-prefixed and we restore the real name on scaffold. */
const RENAME = {
	_gitignore: ".gitignore",
	"_env.local.example": ".env.local.example",
};

function copyDir(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const srcPath = path.join(src, entry.name);
		const outName = RENAME[entry.name] ?? entry.name;
		const destPath = path.join(dest, outName);
		if (entry.isDirectory()) {
			copyDir(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

/**
 * Render the bundled template into `targetDir`, naming the app `appName`.
 *
 * @param {{ templateDir: string, targetDir: string, appName: string }} options
 */
export function scaffold({ templateDir, targetDir, appName }) {
	copyDir(templateDir, targetDir);

	const pkgPath = path.join(targetDir, "package.json");
	const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
	pkg.name = appName;
	fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
