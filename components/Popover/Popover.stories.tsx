import { Button } from "@ui5/webcomponents-react/Button";
import { Popover } from "@ui5/webcomponents-react/Popover";
import { useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Popover,
	parameters: {
		layout: "centered",
	},
	args: {
		opener: "popover-opener",
		onClose: fn(),
	},
});

export default meta;

const TriggerWrapper = ({
	children,
	openerLabel = "Open popover",
}: {
	children: (open: boolean, setOpen: (v: boolean) => void) => React.ReactNode;
	openerLabel?: string;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<div style={{ padding: "120px 60px" }}>
			<Button id="popover-opener" onClick={() => setOpen(true)}>
				{openerLabel}
			</Button>
			{children(open, setOpen)}
		</div>
	);
};

export const Default = meta.story({
	render: (args) => (
		<TriggerWrapper>
			{(open, setOpen) => (
				<Popover {...args} open={open} onClose={() => setOpen(false)}>
					<div style={{ padding: "16px", maxWidth: "260px" }}>
						<p style={{ margin: 0 }}>
							A simple popover anchored to the trigger button. Click outside to
							dismiss.
						</p>
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});

export const WithHeader = meta.story({
	render: (args) => (
		<TriggerWrapper openerLabel="Open with header">
			{(open, setOpen) => (
				<Popover
					{...args}
					open={open}
					onClose={() => setOpen(false)}
					headerText="Entity details"
				>
					<div style={{ padding: "16px", maxWidth: "280px" }}>
						<p style={{ margin: 0 }}>Last modified: 2 hours ago by Jane Doe.</p>
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});

export const WithFooter = meta.story({
	render: (args) => (
		<TriggerWrapper openerLabel="Filters">
			{(open, setOpen) => (
				<Popover
					{...args}
					open={open}
					onClose={() => setOpen(false)}
					headerText="Filter by source"
				>
					<div style={{ padding: "16px", minWidth: "240px" }}>
						<p style={{ margin: 0 }}>Filter form goes here.</p>
					</div>
					<div
						slot="footer"
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: "8px",
							padding: "8px 12px",
						}}
					>
						<Button design="Transparent" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button design="Emphasized" onClick={() => setOpen(false)}>
							Apply
						</Button>
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});

export const PlacementTop = meta.story({
	args: {
		placement: "Top",
	},
	render: (args) => (
		<TriggerWrapper openerLabel="Popover above">
			{(open, setOpen) => (
				<Popover {...args} open={open} onClose={() => setOpen(false)}>
					<div style={{ padding: "16px", maxWidth: "260px" }}>
						<p style={{ margin: 0 }}>
							Anchored above the trigger. Useful for footer-pinned actions.
						</p>
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});

export const PlacementEnd = meta.story({
	args: {
		placement: "End",
	},
	render: (args) => (
		<TriggerWrapper openerLabel="Popover to the side">
			{(open, setOpen) => (
				<Popover {...args} open={open} onClose={() => setOpen(false)}>
					<div style={{ padding: "16px", maxWidth: "240px" }}>
						<p style={{ margin: 0 }}>
							Anchored to the end (right in LTR, left in RTL).
						</p>
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});

export const ModalBackdrop = meta.story({
	args: {
		modal: true,
	},
	render: (args) => (
		<TriggerWrapper openerLabel="Open modal popover">
			{(open, setOpen) => (
				<Popover
					{...args}
					open={open}
					onClose={() => setOpen(false)}
					headerText="Confirm action"
				>
					<div style={{ padding: "16px", maxWidth: "280px" }}>
						<p style={{ margin: 0 }}>
							Modal popovers add a backdrop and trap focus until dismissed.
							Prefer a real Dialog for hard blockers.
						</p>
					</div>
					<div
						slot="footer"
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: "8px",
							padding: "8px 12px",
						}}
					>
						<Button design="Emphasized" onClick={() => setOpen(false)}>
							OK
						</Button>
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});

export const LongScrollableContent = meta.story({
	render: (args) => (
		<TriggerWrapper openerLabel="Long content">
			{(open, setOpen) => (
				<Popover
					{...args}
					open={open}
					onClose={() => setOpen(false)}
					headerText="Activity feed"
				>
					<div style={{ padding: "16px", maxWidth: "320px" }}>
						{Array.from({ length: 14 }, (_, i) => (
							<p
								/* biome-ignore lint/suspicious/noArrayIndexKey: synthetic
								 * demo-only feed where the index IS the stable identity */
								key={i}
								style={{
									margin: "0 0 12px 0",
									fontSize: "12px",
									color: "var(--sapContent_LabelColor)",
								}}
							>
								Activity entry #{i + 1}: entity field updated by user.
							</p>
						))}
					</div>
				</Popover>
			)}
		</TriggerWrapper>
	),
});
