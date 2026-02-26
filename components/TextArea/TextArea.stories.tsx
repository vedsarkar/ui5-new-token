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
				<Button variant="outlined" size="small">
					<Attachment size="small" /> Attach
				</Button>
				<Button variant="outlined" size="small">
					<ContentCopy size="small" /> Copy
				</Button>
				<Button variant="outlined" size="small">
					<Share size="small" /> Share
				</Button>
			</>
		),
	},
});

export const WithError = meta.story({
	args: {
		label: "Email",
		error: true,
		supportingText: "Please enter a valid email address",
		defaultValue: "invalid-email",
	},
});

export const Disabled = meta.story({
	args: {
		label: "Disabled field",
		placeholder: "This field is disabled",
		disabled: true,
	},
});

export const WithSupportingText = meta.story({
	args: {
		label: "Bio",
		supportingText: "Maximum 500 characters",
	},
});

export const AutoResize = meta.story({
	args: {
		label: "Notes",
		defaultValue:
			"This textarea will automatically grow as you type more content.\n\nTry adding more lines to see the auto-resize behavior in action.\n\nThe textarea will expand up to the maximum height, then show a scrollbar.",
	},
});
