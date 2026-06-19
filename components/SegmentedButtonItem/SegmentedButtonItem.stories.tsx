import { SegmentedButton } from "@ui5/webcomponents-react/SegmentedButton";
import { SegmentedButtonItem } from "@ui5/webcomponents-react/SegmentedButtonItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: SegmentedButtonItem,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
});

export default meta;

export const Default = meta.story(() => (
	<SegmentedButton>
		<SegmentedButtonItem selected>List</SegmentedButtonItem>
		<SegmentedButtonItem>Grid</SegmentedButtonItem>
		<SegmentedButtonItem>Map</SegmentedButtonItem>
	</SegmentedButton>
));
