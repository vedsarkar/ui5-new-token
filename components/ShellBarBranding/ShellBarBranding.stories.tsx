import { ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { ShellBarBranding } from "@ui5/webcomponents-react/ShellBarBranding";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ShellBarBranding,
	tags: ["doc-only"],
	parameters: {
		layout: "fullscreen",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ShellBar>
		<ShellBarBranding slot="branding">Reltio</ShellBarBranding>
	</ShellBar>
));
