import { Button } from "@ui5/webcomponents-react/Button";
import { Menu } from "@ui5/webcomponents-react/Menu";
import { MenuItem } from "@ui5/webcomponents-react/MenuItem";
import { useId, useState } from "react";
import copyIcon from "@/icons/sap/copy";
import editIcon from "@/icons/sap/edit";
import preview from "../../.storybook/preview";

const Trigger = ({
	label,
	children,
}: {
	label: string;
	children: (
		openerId: string,
		open: boolean,
		close: () => void,
	) => React.ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	const openerId = `opener-${useId().replace(/:/g, "")}`;
	return (
		<div style={{ padding: "24px" }}>
			<Button id={openerId} onClick={() => setOpen(true)}>
				{label}
			</Button>
			{children(openerId, open, () => setOpen(false))}
		</div>
	);
};

const meta = preview.meta({
	component: MenuItem,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Trigger label="Actions">
		{(openerId, open, close) => (
			<Menu opener={openerId} open={open} onClose={close}>
				<MenuItem text="Edit" icon={editIcon} />
				<MenuItem text="Duplicate" icon={copyIcon} additionalText="⌘D" />
			</Menu>
		)}
	</Trigger>
));
