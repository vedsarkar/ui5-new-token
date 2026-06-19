import { Tab } from "@ui5/webcomponents-react/Tab";
import { TabContainer } from "@ui5/webcomponents-react/TabContainer";
import { TabSeparator } from "@ui5/webcomponents-react/TabSeparator";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TabSeparator,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<TabContainer>
		<Tab text="Overview" selected>
			<div style={{ padding: "16px" }}>Overview</div>
		</Tab>
		<TabSeparator />
		<Tab text="Admin">
			<div style={{ padding: "16px" }}>Admin</div>
		</Tab>
	</TabContainer>
));
