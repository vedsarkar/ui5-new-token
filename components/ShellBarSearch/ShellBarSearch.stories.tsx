import { ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { ShellBarSearch } from "@ui5/webcomponents-react/ShellBarSearch";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ShellBarSearch,
	tags: ["doc-only"],
	parameters: {
		layout: "fullscreen",
	},
});

export default meta;

export const Default = meta.story(() => (
	<ShellBar primaryTitle="Reltio" showSearchField>
		<ShellBarSearch slot="searchField" placeholder="Search entities" />
	</ShellBar>
));
