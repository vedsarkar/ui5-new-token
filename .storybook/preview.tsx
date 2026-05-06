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
import reltioTheme from "./reltio-theme";

initialize({ onUnhandledRequest: "bypass" });

export default definePreview({
	tags: ["autodocs"],

	loaders: [mswLoader],

	parameters: {
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

	addons: [addonDocs(), addonA11y()],
});
