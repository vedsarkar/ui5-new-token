import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineMain } from "@storybook/react-vite/node";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineMain({
	framework: getAbsolutePath("@storybook/react-vite"),

	stories: ["../**/*.story.mdx", "../**/*.stories.@(ts|tsx)"],

	addons: [
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-vitest"),
	],

	staticDirs: ["../public"],

	viteFinal: async (config) => {
		config.resolve = config.resolve ?? {};
		config.resolve.alias = {
			...config.resolve.alias,
			// Path alias matching tsconfig `@/*` → app root
			"@": path.resolve(__dirname, ".."),
			// Next.js module mocks — Storybook runs in Vite, not Next, so these
			// provide lightweight shims for the most common Next.js imports.
			"next/navigation": path.resolve(__dirname, "mocks/next-navigation.ts"),
			"next/link": path.resolve(__dirname, "mocks/next-link.tsx"),
			"next/image": path.resolve(__dirname, "mocks/next-image.tsx"),
			"next/headers": path.resolve(__dirname, "mocks/next-headers.ts"),
		};

		// Next.js environment variables — Vite doesn't process `process.env.*`
		// natively. Define the ones used by app code so they resolve to empty
		// strings instead of throwing "process is not defined".
		config.define = {
			...config.define,
			"process.env.NEXT_PUBLIC_BASE_PATH": JSON.stringify(""),
		};

		// UI5 web components (consumed via @reltio/design) use lazily-initialized
		// module bodies. The production builder can tree-shake those initializer
		// calls away, leaving re-exported components as `undefined` at render time.
		// Disabling tree-shaking keeps every initializer call intact.
		config.build = config.build ?? {};
		config.build.rollupOptions = config.build.rollupOptions ?? {};
		config.build.rollupOptions.treeshake = false;

		return config;
	},
});

function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
