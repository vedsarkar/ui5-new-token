import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import { Attachment, ContentCopy, Share } from "../../icons";
import { Button } from "../Button";
import { TextArea } from "./TextArea";
import cssClasses from "./TextArea.module.css";

const meta = preview.meta({
	component: TextArea,
	parameters: {
		layout: "centered",
		cssClasses,
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
				<Button design="ghost">
					<Attachment size="small" /> Attach
				</Button>
				<Button design="ghost">
					<ContentCopy size="small" /> Copy
				</Button>
				<Button design="ghost">
					<Share size="small" /> Share
				</Button>
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
