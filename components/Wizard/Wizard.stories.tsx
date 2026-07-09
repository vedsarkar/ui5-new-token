import { Bar } from "@ui5/webcomponents-react/Bar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Wizard } from "@ui5/webcomponents-react/Wizard";
import { WizardStep } from "@ui5/webcomponents-react/WizardStep";
import { useState } from "react";
import { fn } from "storybook/test";
import hintIcon from "@/icons/sap/hint";
import leadIcon from "@/icons/sap/lead";
import productIcon from "@/icons/sap/product";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Wizard,
	tags: ["doc-only"],
	parameters: { layout: "fullscreen" },
	args: {
		onStepChange: fn(),
	},
});

export default meta;

export const Default = meta.story({
	render: (args) => {
		const [current, setCurrent] = useState(0);
		return (
			<Wizard {...args}>
				<WizardStep
					titleText="Source"
					icon={productIcon}
					selected={current === 0}
					branching={current < 2}
				>
					<div style={{ padding: 16 }}>
						<p>Pick a data source for the export.</p>
						<Button design="Emphasized" onClick={() => setCurrent(1)}>
							Continue
						</Button>
					</div>
				</WizardStep>
				<WizardStep
					titleText="Attributes"
					icon={hintIcon}
					selected={current === 1}
					disabled={current < 1}
				>
					<div style={{ padding: 16 }}>
						<p>Choose attributes to include in the export.</p>
						<Button design="Transparent" onClick={() => setCurrent(0)}>
							Back
						</Button>
						<Button design="Emphasized" onClick={() => setCurrent(2)}>
							Continue
						</Button>
					</div>
				</WizardStep>
				<WizardStep
					titleText="Review"
					icon={leadIcon}
					selected={current === 2}
					disabled={current < 2}
				>
					<div style={{ padding: 16 }}>
						<p>Review and submit.</p>
						<Bar
							endContent={
								<>
									<Button design="Transparent" onClick={() => setCurrent(1)}>
										Back
									</Button>
									<Button design="Emphasized">Submit</Button>
								</>
							}
						/>
					</div>
				</WizardStep>
			</Wizard>
		);
	},
});

export const FirstStepOnly = meta.story({
	render: (args) => (
		<Wizard {...args}>
			<WizardStep titleText="Source" icon={productIcon} selected>
				<div style={{ padding: 16 }}>Step 1 content.</div>
			</WizardStep>
			<WizardStep titleText="Attributes" icon={hintIcon} disabled>
				<div style={{ padding: 16 }}>Step 2 content.</div>
			</WizardStep>
			<WizardStep titleText="Review" icon={leadIcon} disabled>
				<div style={{ padding: 16 }}>Step 3 content.</div>
			</WizardStep>
		</Wizard>
	),
});

export const SingleStepContentLayout = meta.story({
	args: { contentLayout: "SingleStep" },
	render: (args) => {
		const [current, setCurrent] = useState(0);
		return (
			<Wizard {...args}>
				<WizardStep
					titleText="Source"
					icon={productIcon}
					selected={current === 0}
				>
					<div style={{ padding: 16 }}>
						<p>Only one step is visible at a time with SingleStep layout.</p>
						<Button design="Emphasized" onClick={() => setCurrent(1)}>
							Continue
						</Button>
					</div>
				</WizardStep>
				<WizardStep
					titleText="Attributes"
					icon={hintIcon}
					selected={current === 1}
					disabled={current < 1}
				>
					<div style={{ padding: 16 }}>Attributes step.</div>
				</WizardStep>
			</Wizard>
		);
	},
});

export const Branching = meta.story({
	render: (args) => (
		<Wizard {...args}>
			<WizardStep titleText="Source" icon={productIcon} selected branching>
				<div style={{ padding: 16 }}>
					This step is `branching=true` — the wizard does not know the next step
					ahead of time, useful for conditional flows.
				</div>
			</WizardStep>
			<WizardStep titleText="Conditional" icon={hintIcon} disabled>
				<div style={{ padding: 16 }}>Conditional step content.</div>
			</WizardStep>
		</Wizard>
	),
});
