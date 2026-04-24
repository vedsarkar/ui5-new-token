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
	],

	staticDirs: ["../public"],

	viteFinal: async (config) => {
		config.plugins = config.plugins ?? [];
		config.plugins.push(reltioProxyDevPlugin());
		return config;
	},

	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			include: ["components/**/*.tsx", "charts/**/*.tsx", "icons/**/*.tsx"],
		},
	},
});
