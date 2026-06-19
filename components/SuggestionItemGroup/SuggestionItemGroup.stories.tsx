import { Input } from "@ui5/webcomponents-react/Input";
import { SuggestionItem } from "@ui5/webcomponents-react/SuggestionItem";
import { SuggestionItemGroup } from "@ui5/webcomponents-react/SuggestionItemGroup";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: SuggestionItemGroup,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Input showSuggestions style={{ width: "260px" }}>
		<SuggestionItemGroup headerText="Customers">
			<SuggestionItem text="Acme Corporation" />
			<SuggestionItem text="Globex" />
		</SuggestionItemGroup>
	</Input>
));
