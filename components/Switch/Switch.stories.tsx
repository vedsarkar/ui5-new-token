import { Switch } from "@ui5/webcomponents-react/Switch";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Switch,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		accessibleName: "Auto-merge entities",
		onChange: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const Checked = meta.story({
	args: {
		checked: true,
	},
});

export const WithLabels = meta.story({
	args: {
		textOn: "On",
		textOff: "Off",
		checked: true,
	},
});

export const Graphical = meta.story({
	args: {
		design: "Graphical",
		checked: true,
	},
});

export const AcceptReject = meta.story({
	args: {
		design: "Graphical",
		accessibleName: "Auto-accept merge candidates",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		checked: true,
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		checked: true,
	},
});

export const InSettingsRow = meta.story({
	args: {},
	render: (args) => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				width: "320px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<span>Auto-merge entities</span>
				<Switch {...args} accessibleName="Auto-merge entities" checked />
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<span>Email notifications</span>
				<Switch {...args} accessibleName="Email notifications" />
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<span>Real-time sync</span>
				<Switch {...args} accessibleName="Real-time sync" checked />
			</div>
		</div>
	),
});
