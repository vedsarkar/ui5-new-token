import { ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import { ShellBarSpacer } from "@ui5/webcomponents-react/ShellBarSpacer";
import sysHelpIcon from "@/icons/sap/sys-help";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ShellBarSpacer,
	tags: ["doc-only"],
	parameters: {
		layout: "fullscreen",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ShellBar primaryTitle="Reltio">
		<ShellBarSpacer />
		<ShellBarItem icon={sysHelpIcon} text="Help" />
	</ShellBar>
));
