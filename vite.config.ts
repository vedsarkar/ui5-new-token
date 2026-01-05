import { existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

type PackageJson = {
	peerDependencies?: Record<string, string>;
};

const require = createRequire(import.meta.url);
const packageJson = require("./package.json") as PackageJson;

const componentsDir = path.resolve(__dirname, "components");
const componentEntries = Object.fromEntries(
	readdirSync(componentsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => {
			const entryPath = path.resolve(componentsDir, dirent.name, "index.ts");
			return [dirent.name, entryPath] as const;
		})
		.filter(([, entryPath]) => existsSync(entryPath))
		.sort(([a], [b]) => a.localeCompare(b)),
) satisfies Record<string, string>;

const externalPackages = new Set([
	...Object.keys(packageJson.peerDependencies ?? {}),
]);

const requiredPeerDeps = ["react", "react-dom"] as const;
for (const peerDep of requiredPeerDeps) {
	if (!externalPackages.has(peerDep)) {
		throw new Error(
			`[vite.config] Missing peerDependency "${peerDep}" in package.json`,
		);
	}
}

const isExternal = (source: string) => {
	if (externalPackages.has(source)) {
		return true;
	}

	for (const packageName of externalPackages) {
		if (source.startsWith(`${packageName}/`)) {
			return true;
		}
	}

	return false;
};

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		dts({
			entryRoot: ".",
			outDir: "dist/types",
			insertTypesEntry: true,
			exclude: [
				"**/*.stories.*",
				"**/*.story.mdx",
				"apps",
				"docs",
				"openspec",
				".storybook",
				"build-storybook.log",
			],
		}),
	],
	build: {
		lib: {
			entry: {
				index: path.resolve(__dirname, "index.ts"),
				...componentEntries,
			},
			name: "ReltioDesign",
			fileName: (format, entryName) =>
				format === "cjs" ? `${entryName}.cjs` : `${entryName}.js`,
			formats: ["es", "cjs"],
		},
		emptyOutDir: true,
		copyPublicDir: false,
		cssCodeSplit: false,
		rollupOptions: {
			external: isExternal,
			output: {
				exports: "named",
				assetFileNames: (assetInfo) => {
					const isCssAsset =
						assetInfo.names?.some((name) => name.endsWith(".css")) ??
						assetInfo.originalFileNames?.some((name) =>
							name.endsWith(".css"),
						) ??
						false;

					if (isCssAsset) {
						return "index.css";
					}
					return "[name]-[hash][extname]";
				},
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
});
