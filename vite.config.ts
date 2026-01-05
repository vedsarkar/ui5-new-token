import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

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
			entry: path.resolve(__dirname, "index.ts"),
			name: "ReltioDesign",
			fileName: "index",
			formats: ["es", "cjs"],
		},
		emptyOutDir: true,
		copyPublicDir: false,
		cssCodeSplit: false,
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"react/jsx-dev-runtime",
				"rc-tree",
			],
			output: {
				exports: "named",
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
});
