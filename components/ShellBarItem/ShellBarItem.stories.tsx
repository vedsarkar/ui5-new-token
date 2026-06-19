import { ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const meta = preview.meta({
	component: ShellBarItem,
	tags: ["doc-only"],
	parameters: {
		layout: "fullscreen",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ShellBar primaryTitle="Reltio">
		<ShellBarItem icon="sys-help" text="Help" />
	</ShellBar>
));
