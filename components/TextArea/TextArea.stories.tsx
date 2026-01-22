import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import { Button } from "../Button";
import { TextArea } from "./TextArea";

const meta = preview.meta({
	component: TextArea,
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
					Bold
				</Button>
				<Button variant="outlined" size="small">
					Italic
				</Button>
				<Button variant="outlined" size="small">
					Link
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

export const WithCustomCssVariables = meta.story({
	args: {
		label: "Custom styled",
		supportingText: "Themed with CSS custom properties",
		style: {
			"--reltio-textarea-font-family": "Georgia, serif",
			"--reltio-textarea-font-size": "18px",
			"--reltio-textarea-line-height": "1.6",
			"--reltio-textarea-color-text": "#4a148c",
			"--reltio-textarea-color-border": "#9c27b0",
			"--reltio-textarea-color-border-focus": "#6a1b9a",
			"--reltio-textarea-color-background": "#faf5ff",
			"--reltio-textarea-color-label": "#7b1fa2",
			"--reltio-textarea-color-supporting-text": "#9c27b0",
			"--reltio-textarea-border-radius": "16px",
			"--reltio-textarea-padding": "20px",
			"--reltio-textarea-min-height": "120px",
		},
	},
	parameters: {
		docs: {
			description: {
				story: `
Available CSS custom properties:
- \`--reltio-textarea-font-family\`: Font family for the textarea
- \`--reltio-textarea-font-size\`: Font size for the textarea
- \`--reltio-textarea-line-height\`: Line height for the textarea
- \`--reltio-textarea-color-text\`: Text color
- \`--reltio-textarea-color-border\`: Border color
- \`--reltio-textarea-color-border-focus\`: Border color when focused
- \`--reltio-textarea-color-background\`: Background color
- \`--reltio-textarea-color-error\`: Error state color
- \`--reltio-textarea-color-label\`: Label color
- \`--reltio-textarea-color-supporting-text\`: Supporting text color
- \`--reltio-textarea-border-radius\`: Border radius
- \`--reltio-textarea-padding\`: Inner padding
- \`--reltio-textarea-min-height\`: Minimum height
- \`--reltio-textarea-max-height\`: Maximum height before scrolling
				`,
			},
		},
	},
});
