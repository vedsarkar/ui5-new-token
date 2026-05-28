import { defineMain } from "@storybook/react-vite/node";
import { reltioProxyDevPlugin } from "./reltioProxyDevPlugin.ts";

export default defineMain({
	framework: "@storybook/react-vite",

	// Story sources are enumerated per platform directory on purpose.
	// Do NOT use broad `../**/*.story.mdx` or `../**/*.stories.@(ts|tsx)`
	// patterns: Storybook's `normalizeStoriesEntry` treats every entry as a
	// pure inclusion pattern (negation via `!...` is silently ignored), and
	// the `apps/` submodules — which are read-only mirrors of consumer apps
	// and explicitly NOT part of this build — would get pulled in.
	stories: [
		"../Welcome.story.mdx",
		"../charts/**/*.story.mdx",
		"../charts/**/*.stories.@(ts|tsx)",
		"../components/**/*.story.mdx",
		"../components/**/*.stories.@(ts|tsx)",
		"../guides/**/*.story.mdx",
		"../guides/**/*.stories.@(ts|tsx)",
		"../hooks/**/*.story.mdx",
		"../hooks/**/*.stories.@(ts|tsx)",
		"../openApi/**/*.story.mdx",
		"../openApi/**/*.stories.@(ts|tsx)",
		"../packages/**/*.story.mdx",
		"../packages/**/*.stories.@(ts|tsx)",
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
