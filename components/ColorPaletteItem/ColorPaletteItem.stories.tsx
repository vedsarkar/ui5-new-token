import { ColorPalette } from "@ui5/webcomponents-react/ColorPalette";
import { ColorPaletteItem } from "@ui5/webcomponents-react/ColorPaletteItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ColorPaletteItem,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ColorPalette>
		<ColorPaletteItem value="#1873b4" />
		<ColorPaletteItem value="#107e3e" selected />
		<ColorPaletteItem value="#e9730c" />
		<ColorPaletteItem value="#bb0000" />
	</ColorPalette>
));
