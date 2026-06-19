import { Button } from "@ui5/webcomponents-react/Button";
import { ColorPalette } from "@ui5/webcomponents-react/ColorPalette";
import { ColorPaletteItem } from "@ui5/webcomponents-react/ColorPaletteItem";
import { ColorPalettePopover } from "@ui5/webcomponents-react/ColorPalettePopover";
import { useId, useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const swatches = [
	"#1873b4",
	"#107e3e",
	"#e9730c",
	"#bb0000",
	"#6c32a9",
	"#0a6ed1",
];

const meta = preview.meta({
	component: ColorPalette,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onItemClick: fn(),
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<ColorPalette {...args}>
			{swatches.map((c) => (
				<ColorPaletteItem key={c} value={c} />
			))}
		</ColorPalette>
	),
});

export const Preselected = meta.story({
	render: (args) => (
		<ColorPalette {...args}>
			{swatches.map((c, i) => (
				<ColorPaletteItem key={c} value={c} selected={i === 1} />
			))}
		</ColorPalette>
	),
});

export const InPopover = meta.story({
	render: () => {
		const [open, setOpen] = useState(false);
		const openerId = `colorpalette-opener-${useId().replace(/:/g, "")}`;
		return (
			<div style={{ padding: "32px" }}>
				<Button id={openerId} onClick={() => setOpen(true)}>
					Pick color
				</Button>
				<ColorPalettePopover
					open={open}
					opener={openerId}
					onClose={() => setOpen(false)}
				>
					{swatches.map((c) => (
						<ColorPaletteItem key={c} value={c} />
					))}
				</ColorPalettePopover>
			</div>
		);
	},
});
