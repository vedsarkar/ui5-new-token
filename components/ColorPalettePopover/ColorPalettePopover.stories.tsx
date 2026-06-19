import { Button } from "@ui5/webcomponents-react/Button";
import { ColorPaletteItem } from "@ui5/webcomponents-react/ColorPaletteItem";
import { ColorPalettePopover } from "@ui5/webcomponents-react/ColorPalettePopover";
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
	component: ColorPalettePopover,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Trigger label="Pick color">
		{(openerId, open, close) => (
			<ColorPalettePopover open={open} opener={openerId} onClose={close}>
				<ColorPaletteItem value="#1873b4" />
				<ColorPaletteItem value="#107e3e" />
				<ColorPaletteItem value="#e9730c" />
			</ColorPalettePopover>
		)}
	</Trigger>
));
