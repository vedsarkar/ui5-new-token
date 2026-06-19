import { Input } from "@ui5/webcomponents-react/Input";
import { SuggestionItemCustom } from "@ui5/webcomponents-react/SuggestionItemCustom";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: SuggestionItemCustom,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Input showSuggestions style={{ width: "260px" }}>
		<SuggestionItemCustom>
			<span style={{ fontWeight: 600 }}>Acme Corporation</span>
		</SuggestionItemCustom>
		<SuggestionItemCustom>
			<span>Globex</span>
		</SuggestionItemCustom>
	</Input>
));
