export default {
	framework: "@storybook/nextjs-vite",
	stories: [
		"../docs/Welcome.mdx",
		"../docs/Constitution.mdx",
		"../**/*.stories.@(ts|tsx)",
		"../**/*.story.mdx",
	],
	addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-docs",
        "@storybook/addon-a11y",
        "@storybook/addon-vitest"
    ],
	staticDirs: ["../public"],
	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => {
				if (prop.parent) {
					return !prop.parent.fileName.includes("node_modules");
				}
				return true;
			},
		},
	},
};
