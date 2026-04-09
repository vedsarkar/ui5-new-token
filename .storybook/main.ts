import { defineMain } from "@storybook/react-vite/node";
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
		"@storybook/addon-themes",
		"@storybook/addon-mcp",
	],

	staticDirs: ["../public"],

	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			include: ["components/**/*.tsx", "charts/**/*.tsx"],
		},
	},
});
