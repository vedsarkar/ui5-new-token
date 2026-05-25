import { Bar } from "@ui5/webcomponents-react/Bar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Dialog } from "@ui5/webcomponents-react/Dialog";
import { useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Dialog,
	parameters: { layout: "centered" },
	args: {
		onClose: fn(),
	},
});

export default meta;

export const Default = meta.story({
	args: { headerText: "Confirm action" },
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open dialog</Button>
				<Dialog {...args} open={open} onClose={() => setOpen(false)}>
					<div style={{ padding: 16 }}>
						Are you sure you want to perform this action?
					</div>
				</Dialog>
			</>
		);
	},
});

export const WithFooter = meta.story({
	args: { headerText: "Exit without saving?" },
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open dialog</Button>
				<Dialog
					{...args}
					open={open}
					onClose={() => setOpen(false)}
					footer={
						<Bar
							endContent={
								<>
									<Button design="Transparent" onClick={() => setOpen(false)}>
										Cancel
									</Button>
									<Button design="Emphasized" onClick={() => setOpen(false)}>
										Discard changes
									</Button>
								</>
							}
						/>
					}
				>
					<div style={{ padding: 16 }}>Your unsaved changes will be lost.</div>
				</Dialog>
			</>
		);
	},
});

export const Negative = meta.story({
	args: { state: "Negative", headerText: "Delete entity" },
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button design="Negative" onClick={() => setOpen(true)}>
					Open destructive dialog
				</Button>
				<Dialog
					{...args}
					open={open}
					onClose={() => setOpen(false)}
					footer={
						<Bar
							endContent={
								<>
									<Button design="Transparent" onClick={() => setOpen(false)}>
										Cancel
									</Button>
									<Button design="Negative" onClick={() => setOpen(false)}>
										Delete
									</Button>
								</>
							}
						/>
					}
				>
					<div style={{ padding: 16 }}>
						This action is permanent and cannot be undone.
					</div>
				</Dialog>
			</>
		);
	},
});

export const Stretched = meta.story({
	args: { stretch: true, headerText: "Edit attributes" },
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open stretched dialog</Button>
				<Dialog {...args} open={open} onClose={() => setOpen(false)}>
					<div style={{ padding: 16 }}>
						Long-form editing experience in a stretched dialog.
					</div>
				</Dialog>
			</>
		);
	},
});

export const Closed = meta.story({
	args: { headerText: "Closed dialog" },
	render: (args) => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Toggle dialog</Button>
				<Dialog {...args} open={open} onClose={() => setOpen(false)}>
					<div style={{ padding: 16 }}>
						Default-closed dialog — toggle via the button or the open arg.
					</div>
				</Dialog>
			</>
		);
	},
});
