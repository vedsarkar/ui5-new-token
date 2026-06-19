import { SplitterElement } from "@ui5/webcomponents-react/SplitterElement";
import { SplitterLayout } from "@ui5/webcomponents-react/SplitterLayout";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: SplitterElement,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
		dualTheme: { split: "vertical" },
	},
});

export default meta;

export const Default = meta.story(() => (
	<SplitterLayout style={{ height: "200px", width: "480px" }}>
		<SplitterElement size="30%" minSize={120}>
			<div style={{ padding: "16px" }}>List</div>
		</SplitterElement>
		<SplitterElement>
			<div style={{ padding: "16px" }}>Details</div>
		</SplitterElement>
	</SplitterLayout>
));
