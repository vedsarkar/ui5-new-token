import { Button } from "@ui5/webcomponents-react/Button";
import { MessageBox } from "@ui5/webcomponents-react/MessageBox";
import { useState } from "react";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: MessageBox,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

const BoxTrigger = ({
	label,
	children,
}: {
	label: string;
	children: (open: boolean, close: () => void) => React.ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div style={{ padding: "16px" }}>
			<Button onClick={() => setOpen(true)}>{label}</Button>
			{children(open, () => setOpen(false))}
		</div>
	);
};

export const Confirm = meta.story(() => (
	<BoxTrigger label="Delete entity">
		{(open, close) => (
			<MessageBox
				open={open}
				type="Confirm"
				onClose={close}
				titleText="Delete entity?"
			>
				This permanently removes the profile and its source links.
			</MessageBox>
		)}
	</BoxTrigger>
));

export const Warning = meta.story(() => (
	<BoxTrigger label="Show warning">
		{(open, close) => (
			<MessageBox open={open} type="Warning" onClose={close}>
				Unsaved changes will be lost if you leave this page.
			</MessageBox>
		)}
	</BoxTrigger>
));

export const ErrorMessage = meta.story(() => (
	<BoxTrigger label="Show error">
		{(open, close) => (
			<MessageBox open={open} type="Error" onClose={close}>
				The merge could not be completed because a source is locked.
			</MessageBox>
		)}
	</BoxTrigger>
));

export const Success = meta.story(() => (
	<BoxTrigger label="Show success">
		{(open, close) => (
			<MessageBox open={open} type="Success" onClose={close}>
				The records were merged into a single profile.
			</MessageBox>
		)}
	</BoxTrigger>
));
