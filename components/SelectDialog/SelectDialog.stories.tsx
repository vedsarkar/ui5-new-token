import { Button } from "@ui5/webcomponents-react/Button";
import { ListItemStandard } from "@ui5/webcomponents-react/ListItemStandard";
import { SelectDialog } from "@ui5/webcomponents-react/SelectDialog";
import { useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const sources = [
	"Salesforce CRM",
	"SAP ERP",
	"Marketo",
	"Snowflake",
	"Workday",
];

const meta = preview.meta({
	component: SelectDialog,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		headerText: "Select a source",
		onConfirm: fn(),
		onClose: fn(),
	},
});

export default meta;

const DialogTrigger = ({
	children,
}: {
	children: (open: boolean, close: () => void) => React.ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div style={{ padding: "16px" }}>
			<Button onClick={() => setOpen(true)}>Choose source</Button>
			{children(open, () => setOpen(false))}
		</div>
	);
};

export const SingleSelect = meta.story({
	render: (args) => (
		<DialogTrigger>
			{(open, close) => (
				<SelectDialog {...args} open={open} onClose={close}>
					{sources.map((s) => (
						<ListItemStandard key={s}>{s}</ListItemStandard>
					))}
				</SelectDialog>
			)}
		</DialogTrigger>
	),
});

export const MultiSelect = meta.story({
	render: (args) => (
		<DialogTrigger>
			{(open, close) => (
				<SelectDialog
					{...args}
					open={open}
					onClose={close}
					selectionMode="Multiple"
					confirmButtonText="Add sources"
				>
					{sources.map((s) => (
						<ListItemStandard key={s}>{s}</ListItemStandard>
					))}
				</SelectDialog>
			)}
		</DialogTrigger>
	),
});
