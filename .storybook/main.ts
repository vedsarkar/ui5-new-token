export default {
	framework: "@storybook/nextjs-vite",
	stories: [
		"../docs/Welcome.mdx",
		"../docs/Constitution.mdx",
		"../**/Design.story.mdx",
		"../**/Spec.story.mdx",
		"../**/*.story.mdx",
		"../**/*.stories.@(ts|tsx)",
	],
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
			propFilter: (prop) => {
				if (prop.parent) {
					return !prop.parent.fileName.includes("node_modules");
				}
				return true;
			},
		},
	},
	docs: {
		defaultName: "Overview",
	},
};
