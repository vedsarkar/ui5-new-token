import { Bar } from "@ui5/webcomponents-react/Bar";
import { Button } from "@ui5/webcomponents-react/Button";
import { List } from "@ui5/webcomponents-react/List";
import { ListItemStandard } from "@ui5/webcomponents-react/ListItemStandard";
import { ResponsivePopover } from "@ui5/webcomponents-react/ResponsivePopover";
import { useRef, useState } from "react";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ResponsivePopover,
	tags: ["doc-only"],
	parameters: { layout: "centered" },
	args: {
		onClose: fn(),
	},
});

export default meta;

const useOpenerState = () => {
	const openerRef = useRef<HTMLElement | null>(null);
	const [open, setOpen] = useState(false);
	return { openerRef, open, setOpen };
};

export const Default = meta.story({
	render: (args) => {
		const { openerRef, open, setOpen } = useOpenerState();
		return (
			<>
				<Button
					ref={(node) => {
						openerRef.current = node as unknown as HTMLElement;
					}}
					onClick={() => setOpen(true)}
				>
					Open popover
				</Button>
				<ResponsivePopover
					{...args}
					open={open}
					opener={openerRef.current ?? undefined}
					onClose={() => setOpen(false)}
				>
					<div style={{ padding: 16, maxWidth: 280 }}>
						Quick contextual help, suggestions, or simple confirmations.
					</div>
				</ResponsivePopover>
			</>
		);
	},
});

export const WithMenu = meta.story({
	render: (args) => {
		const { openerRef, open, setOpen } = useOpenerState();
		return (
			<>
				<Button
					ref={(node) => {
						openerRef.current = node as unknown as HTMLElement;
					}}
					onClick={() => setOpen(true)}
				>
					Tenant
				</Button>
				<ResponsivePopover
					{...args}
					open={open}
					opener={openerRef.current ?? undefined}
					onClose={() => setOpen(false)}
				>
					<List onItemClick={() => setOpen(false)}>
						<ListItemStandard>Production</ListItemStandard>
						<ListItemStandard>Sandbox</ListItemStandard>
						<ListItemStandard>QA</ListItemStandard>
						<ListItemStandard>Dev</ListItemStandard>
					</List>
				</ResponsivePopover>
			</>
		);
	},
});

export const WithHeaderAndFooter = meta.story({
	render: (args) => {
		const { openerRef, open, setOpen } = useOpenerState();
		return (
			<>
				<Button
					ref={(node) => {
						openerRef.current = node as unknown as HTMLElement;
					}}
					onClick={() => setOpen(true)}
				>
					Open
				</Button>
				<ResponsivePopover
					{...args}
					open={open}
					opener={openerRef.current ?? undefined}
					headerText="Filters"
					onClose={() => setOpen(false)}
					footer={
						<Bar
							endContent={
								<>
									<Button design="Transparent" onClick={() => setOpen(false)}>
										Cancel
									</Button>
									<Button design="Emphasized" onClick={() => setOpen(false)}>
										Apply
									</Button>
								</>
							}
						/>
					}
				>
					<div style={{ padding: 16, minWidth: 240 }}>
						Filter form goes here.
					</div>
				</ResponsivePopover>
			</>
		);
	},
});

export const PlacementBottom = meta.story({
	render: (args) => {
		const { openerRef, open, setOpen } = useOpenerState();
		return (
			<>
				<Button
					ref={(node) => {
						openerRef.current = node as unknown as HTMLElement;
					}}
					onClick={() => setOpen(true)}
				>
					Open below
				</Button>
				<ResponsivePopover
					{...args}
					open={open}
					opener={openerRef.current ?? undefined}
					placement="Bottom"
					onClose={() => setOpen(false)}
				>
					<div style={{ padding: 16 }}>Anchored below the trigger.</div>
				</ResponsivePopover>
			</>
		);
	},
});
