import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { defineMain } from "@storybook/react-vite/node";
import { reltioProxyDevPlugin } from "./reltioProxyDevPlugin.ts";

export default defineMain({
	framework: getAbsolutePath("@storybook/react-vite"),

	stories: [
		"../Welcome.story.mdx",
		"../Components.story.mdx",
		"../guides/**/*.story.mdx",
		"../openApi/**/*.story.mdx",
		"../**/*.story.mdx",
		"../**/*.stories.@(ts|tsx)",
	],

	addons: [
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-vitest"),
		getAbsolutePath("@storybook/addon-mcp"),
		getAbsolutePath("./reltioManifestPreset.ts"),
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

function getAbsolutePath(value: string): any {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
