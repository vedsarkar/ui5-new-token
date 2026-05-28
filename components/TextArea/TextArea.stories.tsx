import { Button } from "@ui5/webcomponents-react/Button";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import { TextArea } from "./TextArea";
import "@ui5/webcomponents-icons/dist/attachment.js";
import "@ui5/webcomponents-icons/dist/copy.js";
import "@ui5/webcomponents-icons/dist/share-2.js";

const meta = preview.meta({
	component: TextArea,
	tags: ["test"],
	parameters: {
		layout: "centered",
	},
	args: {
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "400px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	args: {
		placeholder: "Enter text...",
	},
});

export const WithLabel = meta.story({
	args: {
		label: "Description",
	},
});

export const WithPlaceholder = meta.story({
	args: {
		placeholder: "Type your message here...",
	},
});

export const WithToolbar = meta.story({
	args: {
		label: "Comment",
		toolbar: (
			<>
				<Button icon="attachment">Attach</Button>
				<Button icon="copy">Copy</Button>
				<Button icon="share-2">Share</Button>
			</>
		),
	},
});

export const ValueStateError = meta.story({
	name: "Error",
	args: {
		label: "Email",
		valueState: "Error",
		valueStateMessage: "Please enter a valid email address",
		defaultValue: "invalid-email",
	},
});

export const ValueStateWarning = meta.story({
	name: "Warning",
	args: {
		label: "Description",
		valueState: "Warning",
		valueStateMessage: "Content exceeds recommended length",
		defaultValue:
			"This is a very long text that exceeds the recommended length for this field.",
	},
});

export const Disabled = meta.story({
	args: {
		label: "Disabled field",
		placeholder: "This field is disabled",
		disabled: true,
	},
});

export const ReadOnly = meta.story({
	args: {
		label: "Read-only field",
		defaultValue: "This content cannot be edited",
		readOnly: true,
	},
});

export const AutoResize = meta.story({
	args: {
		label: "Notes",
		defaultValue:
			"This textarea will automatically grow as you type more content.\n\nTry adding more lines to see the auto-resize behavior in action.\n\nThe textarea will expand up to the maximum height, then show a scrollbar.",
	},
});
