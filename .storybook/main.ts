import { defineMain } from "@storybook/react-vite/node";
import { reltioProxyDevPlugin } from "./reltioProxyDevPlugin.ts";

export default defineMain({
	framework: "@storybook/react-vite",

	stories: [
		"../Welcome.story.mdx",
		"../**/*.story.mdx",
		"../**/*.stories.@(ts|tsx)",
	],

	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
		"@storybook/addon-mcp",
		// Reltio post-processor for the components manifest. Must be listed
		// AFTER `@storybook/addon-mcp` so it sees the manifest the MCP server
		// will read. Currently rewrites `import` snippets to point at the
		// canonical `@reltio/design/<subpath>` paths. See the file's JSDoc
		// for the rationale.
		"./reltioManifestPreset.ts",
	],

	staticDirs: ["../public"],

	features: {
		componentsManifest: true,
	},

	viteFinal: async (config) => {
		config.plugins = config.plugins ?? [];
		config.plugins.push(reltioProxyDevPlugin());
		return config;
	},
});
