import { ActionSheet } from "@ui5/webcomponents-react/ActionSheet";
import { Button } from "@ui5/webcomponents-react/Button";
import { useId, useState } from "react";
import { fn } from "storybook/test";
import deleteIcon from "@/icons/sap/delete";
import editIcon from "@/icons/sap/edit";
import shareIcon from "@/icons/sap/share";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ActionSheet,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onClose: fn(),
	},
});

export default meta;

const SheetTrigger = ({
	children,
}: {
	children: (
		openerId: string,
		open: boolean,
		close: () => void,
	) => React.ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	const openerId = `actionsheet-opener-${useId().replace(/:/g, "")}`;
	return (
		<div style={{ padding: "32px" }}>
			<Button id={openerId} onClick={() => setOpen(true)}>
				More actions
			</Button>
			{children(openerId, open, () => setOpen(false))}
		</div>
	);
};

export const Default = meta.story({
	render: (args) => (
		<SheetTrigger>
			{(openerId, open, close) => (
				<ActionSheet {...args} opener={openerId} open={open} onClose={close}>
					<Button icon={editIcon}>Edit</Button>
					<Button icon={shareIcon}>Share</Button>
					<Button icon={deleteIcon} design="Negative">
						Delete
					</Button>
				</ActionSheet>
			)}
		</SheetTrigger>
	),
});

export const WithHeader = meta.story({
	render: (args) => (
		<SheetTrigger>
			{(openerId, open, close) => (
				<ActionSheet
					{...args}
					opener={openerId}
					open={open}
					onClose={close}
					headerText="Manage entity"
				>
					<Button icon={editIcon}>Edit</Button>
					<Button icon={shareIcon}>Share</Button>
				</ActionSheet>
			)}
		</SheetTrigger>
	),
});
