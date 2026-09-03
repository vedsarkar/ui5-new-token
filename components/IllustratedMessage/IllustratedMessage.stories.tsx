import { Button } from "@ui5/webcomponents-react/Button";
import { IllustratedMessage } from "@ui5/webcomponents-react/IllustratedMessage";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";
import "@ui5/webcomponents-fiori/dist/illustrations/NoEntries.js";
import "@ui5/webcomponents-fiori/dist/illustrations/UnableToLoad.js";
import "@ui5/webcomponents-fiori/dist/illustrations/SuccessScreen.js";

const meta = preview.meta({
	component: IllustratedMessage,
	tags: ["doc-only"],
	parameters: { layout: "centered" },
});

export default meta;

export const NoData = meta.story({
	args: {
		name: "NoData",
		titleText: "No data to display",
		subtitleText: "Adjust your filters or load a new dataset.",
	},
});

export const NoEntries = meta.story({
	args: {
		name: "NoEntries",
		titleText: "Nothing here yet",
		subtitleText: "Create your first export to get started.",
	},
	render: (args) => (
		<IllustratedMessage {...args}>
			<Button design="Emphasized" onClick={fn()}>
				Create export
			</Button>
		</IllustratedMessage>
	),
});

export const ErrorScreen = meta.story({
	args: {
		name: "UnableToLoad",
		titleText: "We could not load this page",
		subtitleText: "Try again, or contact support if the problem persists.",
	},
	render: (args) => (
		<IllustratedMessage {...args}>
			<Button design="Emphasized" onClick={fn()}>
				Retry
			</Button>
		</IllustratedMessage>
	),
});

export const SuccessScreen = meta.story({
	args: {
		name: "SuccessScreen",
		titleText: "All done",
		subtitleText: "Your file is ready to download.",
	},
});

export const SpotSize = meta.story({
	args: {
		name: "NoData",
		titleText: "Inline empty state",
		subtitleText: "Use the spot size when the illustration sits inside a card.",
		design: "Spot",
	},
});

export const SceneSize = meta.story({
	args: {
		name: "NoData",
		titleText: "Full-page empty state",
		subtitleText:
			"Use the scene size for full-page empty/error states with primary CTAs.",
		design: "Scene",
	},
});

export const DialogSize = meta.story({
	args: {
		name: "NoData",
		titleText: "Dialog empty state",
		subtitleText: "Use the dialog size inside modal dialogs and side panels.",
		design: "Dialog",
	},
});

export const DotSize = meta.story({
	args: {
		name: "NoData",
		titleText: "Compact empty state",
		subtitleText: "Use the dot size for inline states in tables and lists.",
		design: "Dot",
	},
});

export const NoTitle = meta.story({
	args: {
		name: "NoData",
		subtitleText:
			"Title-less variant — the illustration plus subtitle communicates the state.",
	},
});
