import { Button } from "@ui5/webcomponents-react/Button";
import { Menu } from "@ui5/webcomponents-react/Menu";
import { MenuItem } from "@ui5/webcomponents-react/MenuItem";
import { MenuItemGroup } from "@ui5/webcomponents-react/MenuItemGroup";
import { useId, useState } from "react";
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
	component: MenuItemGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Trigger label="Sort by">
		{(openerId, open, close) => (
			<Menu opener={openerId} open={open} onClose={close}>
				<MenuItemGroup checkMode="Single">
					<MenuItem text="Name" checked />
					<MenuItem text="Date" />
				</MenuItemGroup>
			</Menu>
		)}
	</Trigger>
));
