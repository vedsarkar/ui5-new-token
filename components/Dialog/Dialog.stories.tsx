import {
	ArgTypes,
	Description,
	Subtitle,
	Title,
} from "@storybook/addon-docs/blocks";
import { useState } from "react";
import { CssClasses } from "@/.storybook/blocks/CssClasses";
import preview from "@/.storybook/preview";
import { Button } from "@/components/Button";
import { TextArea } from "@/components/TextArea";
import { Info } from "@/icons/Info";
import { Dialog } from "./Dialog";
import cssClasses from "./Dialog.module.css";

const paragraphs = Array.from(
	{ length: 20 },
	(_, i) =>
		`Paragraph ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
);

const meta = preview.meta({
	component: Dialog,
	parameters: {
		layout: "centered",
		cssClasses,
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<h3>Props</h3>
					<ArgTypes />
					<CssClasses />
					<h3>Stories</h3>
					<p>
						Dialog stories open a modal overlay and cannot be rendered inline on
						this page. Use the sidebar navigation to view each story
						individually.
					</p>
				</>
			),
		},
	},
});

export const Default = meta.story({
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<p>This is a basic dialog with body content only.</p>
				</Dialog>
			</>
		);
	},
});

export const WithHeaderAndFooter = meta.story({
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					header="Dialog Title"
					footer={
						<>
							<Button design="ghost" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button design="emphasized" onClick={() => setOpen(false)}>
								Confirm
							</Button>
						</>
					}
				>
					<div style={{ marginBottom: 16 }}>
						Dialog body content goes here. The header and footer are provided
						via props.
					</div>
					<TextArea
						label="Reason for Action"
						placeholder="Enter a Reason"
						name="reason"
						data-autofocus
						style={{ minHeight: "200px" }}
					/>
				</Dialog>
			</>
		);
	},
});

export const CustomBody = meta.story({
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
							marginBottom: 4,
						}}
					>
						<Info size="medium" design="emphasized" />
						<span style={{ fontSize: 18, fontWeight: 600 }}>
							This is the title
						</span>
					</div>
					<p
						style={{
							color: "var(--sapContent_LabelColor)",
							fontSize: 14,
							marginBottom: 16,
						}}
					>
						Content comes here - Content comes here - Content comes here -
						Content comes here
					</p>
					<TextArea
						label="Reason for Action"
						placeholder="Enter a Reason"
						name="reason"
						data-autofocus
						style={{ minHeight: "200px" }}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							gap: 8,
							marginTop: 16,
						}}
					>
						<Button design="ghost" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button design="emphasized" onClick={() => setOpen(false)}>
							Save
						</Button>
					</div>
				</Dialog>
			</>
		);
	},
});

export const ScrollableContent = meta.story({
	render: () => {
		const [open, setOpen] = useState(true);
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog
					open={open}
					onClose={() => setOpen(false)}
					header="Scrollable Content"
					footer={
						<Button design="emphasized" onClick={() => setOpen(false)}>
							Close
						</Button>
					}
				>
					{paragraphs.map((text) => (
						<p key={text}>{text}</p>
					))}
				</Dialog>
			</>
		);
	},
});
