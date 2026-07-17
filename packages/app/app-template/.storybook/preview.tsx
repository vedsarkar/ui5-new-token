import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import {
	ArgTypes,
	Description,
	Stories,
	Title,
} from "@storybook/addon-docs/blocks";
import { definePreview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import { withAppShell } from "./decorators/withAppShell";
import { handlers } from "./mocks";

initialize({ onUnhandledRequest: "bypass" });

export default definePreview({
	tags: ["autodocs"],

	decorators: [withAppShell],

	loaders: [mswLoader],

	parameters: {
		layout: "fullscreen",

		msw: { handlers: handlers() },

		docs: {
			page: () => (
				<>
					<Title />
					<Description />
					<ArgTypes />
					<Stories />
				</>
			),
		},

		a11y: {
			test: "todo",
		},
	},

	addons: [addonDocs(), addonA11y()],
});
