import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineMain } from "@storybook/react-vite/node";
import { reltioProxyDevPlugin } from "./reltioProxyDevPlugin.ts";

export default defineMain({
	framework: getAbsolutePath("@storybook/react-vite"),

	stories: [
		"../Welcome.story.mdx",
		"../Components.story.mdx",
		"../guides/**/*.story.mdx",
		"../openApi/**/*.story.mdx",
		// Broad catch-all for every top-level source folder EXCEPT `packages`.
		// Storybook globs each entry independently and unions the results, so a
		// standalone `!…/dist/**` negation entry does NOT subtract from other
		// entries — the only reliable way to skip a folder is to not match it.
		// `packages` is therefore handled explicitly below so the built `dist/`
		// mirrors (e.g. `packages/app/dist/app-template/app/page.stories.tsx`)
		// are never indexed — they would clash with the `app-template` sources
		// and abort the build with duplicate story ids.
		"../!(packages)/**/*.story.mdx",
		"../!(packages)/**/*.stories.@(ts|tsx)",
		"../packages/*/*.story.mdx",
		"../packages/app/app-template/**/*.story.mdx",
		"../packages/app/app-template/**/*.stories.@(ts|tsx)",
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

		// UI5 React components are produced by side-effectful, lazily-initialized
		// module bodies (the custom-element `define()` + the React wrapper assigned
		// inside an `__esm(() => …)` initializer). The production builder
		// (Rolldown-powered Vite) tree-shakes some of those initializer CALLS away
		// while keeping the live binding, so a re-exported component (e.g.
		// `RadioButton`) ends up `undefined` at render time. That made the static
		// build crash on the Form "With Submit" story with
		// `Cannot read properties of undefined (reading 'displayName')` (the docs
		// source serializer reads `element.type.displayName`), even though dev —
		// which initializes every module eagerly — was fine.
		//
		// Disabling tree-shaking keeps every module initializer call, so the
		// components are always initialized before use. `treeshake: { moduleSideEffects:
		// true }` was tried first but did NOT prevent the dropped initializer call;
		// only a full disable does. This affects the Storybook build output only —
		// it is a dev/documentation tool, not the shipped `@reltio/design` package —
		// so the modest size increase is acceptable in exchange for correctness.
		config.build = config.build ?? {};
		config.build.rollupOptions = config.build.rollupOptions ?? {};
		config.build.rollupOptions.treeshake = false;

		return config;
	},
});

function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
