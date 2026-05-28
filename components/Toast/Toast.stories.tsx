import { Button } from "@ui5/webcomponents-react/Button";
import { Toast } from "@ui5/webcomponents-react/Toast";
import { useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Toast,
	tags: ["doc-only"],
	parameters: { layout: "centered" },
	args: {
		duration: 3000,
		onClose: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ position: "relative", minHeight: 80, minWidth: 280 }}>
				<Story />
			</div>
		),
	],
});

export default meta;

const useToast = () => {
	const [open, setOpen] = useState(false);
	return {
		open,
		show: () => setOpen(true),
		close: () => setOpen(false),
	};
};

export const Default = meta.story({
	args: {
		children: "Changes saved",
	},
	render: (args) => {
		const { open, show, close } = useToast();
		return (
			<>
				<Button onClick={show}>Show toast</Button>
				<Toast {...args} open={open} onClose={close} />
			</>
		);
	},
});

export const PlacementTopCenter = meta.story({
	args: {
		placement: "TopCenter",
		children: "Top-anchored toast",
	},
	render: (args) => {
		const { open, show, close } = useToast();
		return (
			<>
				<Button onClick={show}>Show top toast</Button>
				<Toast {...args} open={open} onClose={close} />
			</>
		);
	},
});

export const PlacementBottomEnd = meta.story({
	args: {
		placement: "BottomEnd",
		children: "Bottom-right toast",
	},
	render: (args) => {
		const { open, show, close } = useToast();
		return (
			<>
				<Button onClick={show}>Show bottom-right toast</Button>
				<Toast {...args} open={open} onClose={close} />
			</>
		);
	},
});

export const LongMessage = meta.story({
	args: {
		children:
			"Long status messages wrap inside the toast — keep copy short whenever possible, but the toast handles overflow gracefully.",
	},
	render: (args) => {
		const { open, show, close } = useToast();
		return (
			<>
				<Button onClick={show}>Show long toast</Button>
				<Toast {...args} open={open} onClose={close} />
			</>
		);
	},
});
