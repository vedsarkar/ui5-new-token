import { defineMain } from "@storybook/nextjs-vite/node";
export default defineMain({
	framework: "@storybook/nextjs-vite",

	stories: ["../**/*.story.mdx", "../**/*.stories.@(ts|tsx)"],

	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],

	staticDirs: ["../public"],

	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
		},
	},
});
