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
import { definePreview } from "@storybook/nextjs-vite";

export default definePreview({
	tags: ["autodocs"],

	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<h3>Props</h3>
					<ArgTypes />
					<Stories />
				</>
			),
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
