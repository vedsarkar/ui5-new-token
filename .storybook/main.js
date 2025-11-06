/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: [
		"../stories/Welcome.mdx",
		"../stories/**/*.mdx",
		"../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	staticDirs: ["../public"],
};
export default config;
