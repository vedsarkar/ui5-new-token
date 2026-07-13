import { Button } from "@ui5/webcomponents-react/Button";
import { Menu } from "@ui5/webcomponents-react/Menu";
import { MenuItem } from "@ui5/webcomponents-react/MenuItem";
import { MenuItemGroup } from "@ui5/webcomponents-react/MenuItemGroup";
import { MenuSeparator } from "@ui5/webcomponents-react/MenuSeparator";
import { useId, useState } from "react";
import { fn } from "storybook/test";
import copyIcon from "@/icons/sap/copy";
import deleteIcon from "@/icons/sap/delete";
import editIcon from "@/icons/sap/edit";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Menu,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onClose: fn(),
	},
});

export default meta;

const MenuTrigger = ({
	children,
}: {
	children: (
		openerId: string,
		open: boolean,
		close: () => void,
	) => React.ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	const openerId = `menu-opener-${useId().replace(/:/g, "")}`;
	return (
		<div style={{ padding: "32px" }}>
			<Button id={openerId} onClick={() => setOpen(true)}>
				Actions
			</Button>
			{children(openerId, open, () => setOpen(false))}
		</div>
	);
};

export const Default = meta.story({
	render: (args) => (
		<MenuTrigger>
			{(openerId, open, close) => (
				<Menu {...args} opener={openerId} open={open} onClose={close}>
					<MenuItem text="Edit" icon={editIcon} />
					<MenuItem text="Duplicate" icon={copyIcon} />
					<MenuItem text="Delete" icon={deleteIcon} />
				</Menu>
			)}
		</MenuTrigger>
	),
});

export const WithGroupAndSeparator = meta.story({
	render: (args) => (
		<MenuTrigger>
			{(openerId, open, close) => (
				<Menu {...args} opener={openerId} open={open} onClose={close}>
					<MenuItemGroup checkMode="Single">
						<MenuItem text="Sort ascending" checked />
						<MenuItem text="Sort descending" />
					</MenuItemGroup>
					<MenuSeparator />
					<MenuItem text="Reset" />
				</Menu>
			)}
		</MenuTrigger>
	),
});

export const WithSubmenu = meta.story({
	render: (args) => (
		<MenuTrigger>
			{(openerId, open, close) => (
				<Menu {...args} opener={openerId} open={open} onClose={close}>
					<MenuItem text="Export">
						<MenuItem text="CSV" />
						<MenuItem text="JSON" />
					</MenuItem>
					<MenuItem text="Share" additionalText="⌘S" />
				</Menu>
			)}
		</MenuTrigger>
	),
});
