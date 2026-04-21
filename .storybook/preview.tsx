import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import {
	ArgTypes,
	Description,
	Stories,
	Subtitle,
	Title,
} from "@storybook/addon-docs/blocks";
import addonThemes, { withThemeByDataAttribute } from "@storybook/addon-themes";
import { definePreview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import { CssClasses } from "./blocks/CssClasses";
import { ImportExample } from "./blocks/ImportExample";
import { reltioProxyHandler } from "./mocks/reltioProxyHandler";

initialize({ onUnhandledRequest: "bypass" });

export default definePreview({
	tags: ["autodocs"],

	loaders: [mswLoader],

	parameters: {
		msw: {
			handlers: [reltioProxyHandler],
		},

		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<ImportExample />
					<Description />
					<ArgTypes />
					<CssClasses />
					<Stories />
				</>
			),
			toc: true,
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},

		options: {
			storySort: {
				method: "configure",
			},
		},
	},

	decorators: [
		withThemeByDataAttribute({
			themes: {
				Light: "light",
				Dark: "dark",
			},
			defaultTheme: "Light",
			attributeName: "data-theme",
		}),
	],

	addons: [addonDocs(), addonA11y(), addonThemes()],
});
