import { Icon } from "@ui5/webcomponents-react/Icon";
import { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/sys-help-2.js";

const meta = preview.meta({
	component: MessageStrip,
	parameters: {
		layout: "padded",
	},
	args: {
		children: "An informational message about the current state.",
		onClose: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "560px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Information = meta.story({
	args: {
		design: "Information",
		children: "3 entity merge candidates are awaiting your review.",
	},
});

export const Positive = meta.story({
	args: {
		design: "Positive",
		children: "Entity saved successfully.",
	},
});

export const Warning = meta.story({
	args: {
		design: "Warning",
		children:
			"Source priority differs from the tenant default. Confirm before saving.",
	},
});

export const Negative = meta.story({
	args: {
		design: "Negative",
		children:
			"Failed to save the entity. Reltio API returned 503 — please retry.",
	},
});

export const Persistent = meta.story({
	args: {
		design: "Warning",
		hideCloseButton: true,
		children: "Draft has unsaved changes.",
	},
});

export const TextOnly = meta.story({
	args: {
		design: "Information",
		hideIcon: true,
		children: "A message strip with the default icon hidden.",
	},
});

export const CustomIcon = meta.story({
	args: {
		design: "Information",
		icon: <Icon name="sys-help-2" />,
		children: "Need help? Check the matching rules documentation.",
	},
});

export const LongContent = meta.story({
	args: {
		design: "Negative",
		children:
			"The entity could not be merged because three of its sources are flagged as authoritative for the same attribute (firstName). Resolve the conflict in the Source Priority screen, or override the default rule for this entity type, then retry the merge operation. Affected sources: SAP, Salesforce, Workday.",
	},
});
