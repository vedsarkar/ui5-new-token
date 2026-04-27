import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import {
	ArgTypes,
	Description,
	Stories,
	Subtitle,
	Title,
} from "@storybook/addon-docs/blocks";
import { definePreview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import { CssClasses } from "./blocks/CssClasses";
import { ImportExample } from "./blocks/ImportExample";
import { reltioProxyHandler } from "./mocks/reltioProxyHandler";
import reltioTheme from "./reltio-theme";

initialize({ onUnhandledRequest: "bypass" });

export default definePreview({
	tags: ["autodocs"],

	loaders: [mswLoader],

	parameters: {
		msw: {
			handlers: [reltioProxyHandler],
		},

		docs: {
			theme: reltioTheme,
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
			toc: {
				headingSelector: "h2, h3",
			},
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
				order: ["Welcome", "Icons", "Design Tokens", "*"],
			},
		},
	},

	globalTypes: {
		theme: {
			name: "Theme",
			description: "Active Reltio theme",
			defaultValue: "auto",
			toolbar: {
				icon: "paintbrush",
				items: [
					{ value: "auto", title: "Auto (system)" },
					{ value: "horizon-light", title: "Horizon Light" },
					{ value: "horizon-dark", title: "Horizon Dark" },
				],
				dynamicTitle: true,
			},
		},
	},

	decorators: [
		(Story, context) => {
			const selection = (context.globals.theme as string) ?? "auto";
			const theme =
				selection === "auto"
					? window.matchMedia("(prefers-color-scheme: dark)").matches
						? "horizon-dark"
						: "horizon-light"
					: selection;
			return (
				<div data-theme={theme}>
					<Story />
				</div>
			);
		},
	],

	addons: [addonDocs(), addonA11y()],
});
