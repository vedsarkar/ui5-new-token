import { Button } from "@ui5/webcomponents-react/Button";
import { FileUploader } from "@ui5/webcomponents-react/FileUploader";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: FileUploader,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	args: {
		placeholder: "Choose entity import file",
	},
});

export const WithButton = meta.story({
	args: {
		hideInput: true,
	},
	render: (args) => (
		<FileUploader {...args}>
			<Button design="Emphasized">Upload entity records…</Button>
		</FileUploader>
	),
});

export const RestrictedToCsv = meta.story({
	args: {
		accept: ".csv,text/csv",
		placeholder: "CSV files only",
	},
});

export const RestrictedToImages = meta.story({
	args: {
		accept: "image/png,image/jpeg",
		placeholder: "PNG or JPEG profile photo",
	},
});

export const MultipleFiles = meta.story({
	args: {
		multiple: true,
		placeholder: "Attach multiple source documents",
	},
});

export const Required = meta.story({
	args: {
		required: true,
		placeholder: "Required upload",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		placeholder: "Upload temporarily disabled",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		placeholder: "Upload failed — try again",
	},
});

export const InsideForm = meta.story({
	args: {
		name: "entityImport",
		placeholder: "Pick entity import",
	},
	decorators: [
		(Story) => (
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
				style={{ display: "flex", gap: "8px", alignItems: "center" }}
			>
				<Story />
				<Button design="Emphasized" type="Submit">
					Submit
				</Button>
			</form>
		),
	],
});
