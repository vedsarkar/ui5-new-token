import { Option } from "@ui5/webcomponents-react/Option";
import { Select } from "@ui5/webcomponents-react/Select";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Option,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Select style={{ width: "240px" }}>
		<Option value="active">Active</Option>
		<Option value="pending" selected>
			Pending
		</Option>
		<Option value="archived">Archived</Option>
	</Select>
));
