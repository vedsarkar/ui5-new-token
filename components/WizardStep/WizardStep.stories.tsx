import { Wizard } from "@ui5/webcomponents-react/Wizard";
import { WizardStep } from "@ui5/webcomponents-react/WizardStep";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: WizardStep,
	tags: ["doc-only"],
	parameters: {
		layout: "fullscreen",
	},
});

export default meta;

export const Default = meta.story(() => (
	<Wizard style={{ height: "320px" }}>
		<WizardStep titleText="Source" selected>
			<div style={{ padding: "16px" }}>Choose a source system.</div>
		</WizardStep>
		<WizardStep titleText="Mapping" disabled>
			<div style={{ padding: "16px" }}>Map the attributes.</div>
		</WizardStep>
		<WizardStep titleText="Review" disabled>
			<div style={{ padding: "16px" }}>Confirm and run.</div>
		</WizardStep>
	</Wizard>
));
