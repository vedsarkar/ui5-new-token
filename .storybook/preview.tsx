import {
	ArgTypes,
	Description,
	Primary,
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
			autodocs: "tag",
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<ArgTypes />
					<Stories />
				</>
			),
		},
	},
};

export default preview;
