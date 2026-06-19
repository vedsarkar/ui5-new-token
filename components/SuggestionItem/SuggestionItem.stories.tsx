import { Input } from "@ui5/webcomponents-react/Input";
import { SuggestionItem } from "@ui5/webcomponents-react/SuggestionItem";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: SuggestionItem,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Input showSuggestions style={{ width: "260px" }}>
		<SuggestionItem text="Acme Corporation" />
		<SuggestionItem text="Acme Industries" />
		<SuggestionItem text="Acme Holdings" />
	</Input>
));
