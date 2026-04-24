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
import { useEffect } from "react";
import type { ThemeSelection } from "@/components/ThemeProvider";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { CssClasses } from "./blocks/CssClasses";
import { ImportExample } from "./blocks/ImportExample";
import { reltioProxyHandler } from "./mocks/reltioProxyHandler";
import reltioTheme from "./reltio-theme";

initialize({ onUnhandledRequest: "bypass" });

const ThemeSyncer = ({ value }: { value: ThemeSelection }) => {
	const { setTheme } = useTheme();
	useEffect(() => {
		setTheme(value);
	}, [value, setTheme]);
	return null;
};

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
			if (context.parameters?.skipThemeProvider) return <Story />;
			const theme = (context.globals.theme as ThemeSelection) ?? "auto";
			return (
				<ThemeProvider
					defaultTheme={theme}
					themeUrls={{
						"horizon-light": "/themes/horizon-light.theme.css",
						"horizon-dark": "/themes/horizon-dark.theme.css",
					}}
				>
					<ThemeSyncer value={theme} />
					<Story />
				</ThemeProvider>
			);
		},
	],

	addons: [addonDocs(), addonA11y()],
});
