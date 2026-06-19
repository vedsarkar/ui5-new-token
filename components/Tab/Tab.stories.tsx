import { Tab } from "@ui5/webcomponents-react/Tab";
import { TabContainer } from "@ui5/webcomponents-react/TabContainer";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Tab,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<TabContainer>
		<Tab text="Overview" selected>
			<div style={{ padding: "16px" }}>Entity overview.</div>
		</Tab>
		<Tab text="Sources">
			<div style={{ padding: "16px" }}>Connected sources.</div>
		</Tab>
	</TabContainer>
));
