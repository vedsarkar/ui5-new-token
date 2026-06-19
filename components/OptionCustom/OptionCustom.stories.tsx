import { OptionCustom } from "@ui5/webcomponents-react/OptionCustom";
import { Select } from "@ui5/webcomponents-react/Select";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: OptionCustom,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Select style={{ width: "240px" }}>
		<OptionCustom value="active" selected>
			<span style={{ fontWeight: 600 }}>Active</span>
		</OptionCustom>
		<OptionCustom value="pending">
			<span>Pending review</span>
		</OptionCustom>
	</Select>
));
