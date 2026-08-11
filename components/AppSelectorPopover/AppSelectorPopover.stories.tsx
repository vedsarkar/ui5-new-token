import { Button } from "@ui5/webcomponents-react/Button";
import { type ReactNode, useId, useState } from "react";
import { expect, userEvent, waitFor } from "storybook/test";
import preview from "../../.storybook/preview";
import { AppSelectorPopover } from "./AppSelectorPopover";

const Trigger = ({
	label,
	children,
}: {
	label: string;
	children: (openerId: string, open: boolean, close: () => void) => ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	const openerId = `opener-${useId().replace(/:/g, "")}`;
	return (
		<div style={{ padding: "24px" }}>
			<Button id={openerId} onClick={() => setOpen(true)}>
				{label}
			</Button>
			{children(openerId, open, () => setOpen(false))}
		</div>
	);
};

const meta = preview.meta({
	component: AppSelectorPopover,
	parameters: {
		layout: "centered",
	},
});

export default meta;

// A catalog that mixes several dimensions the popover has to handle in one
// place: multiple categories (Agentflow → Applications → Tenant Management)
// stay adjacent after `orderApps` even though the input list interleaves
// them, `${environment}` / `${tenant}` template placeholders are resolved
// against the `env` / `tenant` props, and entries missing `name` or `uri`
// are silently filtered out. The per-behaviour edge cases are covered by
// `AppSelectorPopover.utils.test.ts` — this story documents the resulting
// grid visually.
const catalog = [
	{
		name: "Agents",
		// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholders
		uri: "https://example.com/agent-flow?env=${environment}&tenant=${tenant}",
		icon: "https://reltio.design/apps/icons/agentflow.svg",
		category: "Agentflow",
	},
	{
		name: "Hub",
		// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholders
		uri: "https://example.com/hub?env=${environment}&tenant=${tenant}",
		icon: "https://reltio.design/apps/icons/mdm.svg",
		category: "Applications",
	},
	{
		name: "Quality",
		uri: "https://example.com/af-quality",
		icon: "https://reltio.design/apps/icons/af-quality.svg",
		category: "Agentflow",
	},
	{
		name: "Console",
		// biome-ignore lint/suspicious/noTemplateCurlyInString: URI template placeholders
		uri: "https://example.com/console?env=${environment}&tenant=${tenant}",
		icon: "https://reltio.design/apps/icons/console.svg",
		category: "Applications",
	},
	{
		name: "RDM",
		uri: "https://example.com/rdm",
		icon: "https://reltio.design/apps/icons/rdm.svg",
		category: "Applications",
	},
	{
		name: "External Match",
		uri: "https://example.com/external-match",
		icon: "https://reltio.design/apps/icons/external-match.svg",
		category: "Tenant Management",
	},
	{
		name: "Data Loader",
		uri: "https://example.com/data-loader",
		icon: "https://reltio.design/apps/icons/data-loader.svg",
		category: "Tenant Management",
	},
	// Entries below are filtered out by `orderApps`. Included in the story
	// so a manual reader sees the popover still renders correctly.
	{ uri: "https://example.com/no-name" },
	{ name: "No URI" },
	{},
];

export const Default = meta.story({
	play: async () => {
		const button = document.querySelector("ui5-button") as HTMLElement;
		await userEvent.click(button);
		await waitFor(() => {
			const popover = document.querySelector("ui5-popover");
			expect(popover && (popover as unknown as { open: boolean }).open).toBe(
				true,
			);
			// The `orderApps` filtering and category-ordering are covered by
			// AppSelectorPopover.utils.test.ts — this story only needs to prove
			// the trigger opens the popover.
		});
	},
	render: () => (
		<Trigger label="Applications">
			{(openerId, open, close) => (
				<AppSelectorPopover
					open={open}
					opener={openerId}
					onClose={close}
					env="us-prod"
					tenant="acme-corp"
					apps={catalog}
				/>
			)}
		</Trigger>
	),
});
