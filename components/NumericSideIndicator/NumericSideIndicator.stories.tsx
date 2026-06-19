import { NumericSideIndicator } from "@ui5/webcomponents-react/NumericSideIndicator";
import preview from "../../.storybook/preview";
import type { NumericSideIndicatorProps } from "./NumericSideIndicator.types";

// `state` is typed as the bare `ValueColor` enum (not the usual
// `Enum | keyof typeof Enum`), and the enum isn't exported on a public subpath,
// so we cast the string literal to the prop's type.
type State = NumericSideIndicatorProps["state"];

const meta = preview.meta({
	component: NumericSideIndicator,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		titleText: "Deviation",
		number: 12,
		unit: "%",
	},
});

export default meta;

export const Default = meta.story({});

export const Good = meta.story({
	args: {
		titleText: "Matched",
		number: 98,
		unit: "%",
		state: "Good" as State,
	},
});

export const Critical = meta.story({
	args: {
		titleText: "Pending",
		number: 24,
		unit: "%",
		state: "Critical" as State,
	},
});

export const ErrorState = meta.story({
	args: {
		titleText: "Failed",
		number: 5,
		unit: "%",
		state: "Error" as State,
	},
});
