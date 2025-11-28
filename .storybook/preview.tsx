import {
	ArgTypes,
	Description,
	Stories,
	Subtitle,
	Title,
} from "@storybook/addon-docs/blocks";
// biome-ignore lint/correctness/noUnusedImports: Required for TypeScript JSX types
import React from "react";

const preview = {
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
};

export default preview;
