import { MultiInput } from "@ui5/webcomponents-react/MultiInput";
import { Token } from "@ui5/webcomponents-react/Token";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Token,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story(() => (
	<MultiInput
		style={{ width: "320px" }}
		tokens={
			<>
				<Token text="Country = US" />
				<Token text="Status = Active" />
			</>
		}
	/>
));
