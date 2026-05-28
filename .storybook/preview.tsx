// Pre-load UI5 CLDR locale data so components don't fall back to CDN at runtime.
// Without this import, Calendar/DatePicker/TimePicker components make network
// requests during tests, adding ~10s of latency in CI.
import "@ui5/webcomponents-localization/dist/Assets.js";

// Side-effect module — turns the preview into a deterministic snapshot
// environment (frozen Date, UI5 animations off, CSS animations off, ECharts
// animations off via a window flag). See the file's JSDoc for the rationale
// of every step. Imported FIRST so the global Date is patched before any
// component renders or any UI5 module reads "today".
import "./blocks/snapshotEnvironment";

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
import { DualThemeDecorator } from "./blocks/DualThemeDecorator";
import reltioTheme from "./reltio-theme";

initialize({ onUnhandledRequest: "bypass" });

export default definePreview({
	// Vitest is off by default — Chromatic already covers visual regression
	// for every story. Components with real source code (.tsx) opt back in
	// via `tags: ["vitest"]` in their story meta so they appear in coverage.
	// Documentation-only UI5 re-exports (stories-only dirs) stay excluded.
	tags: ["autodocs", "!vitest"],

	decorators: [DualThemeDecorator],

	loaders: [mswLoader],

	parameters: {
		docs: {
			theme: reltioTheme,
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
