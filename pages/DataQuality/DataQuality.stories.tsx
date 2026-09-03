import preview from "../../.storybook/preview";
import { DataQuality } from "./DataQuality";

const meta = preview.meta({
	title: "Pages/Data Quality",
	component: DataQuality,
	parameters: {
		layout: "fullscreen",
		dualTheme: { split: "vertical" },
	},
});

export default meta;

export const Default = meta.story({});
