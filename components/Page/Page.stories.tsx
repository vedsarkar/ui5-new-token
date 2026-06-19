import { Bar } from "@ui5/webcomponents-react/Bar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Page } from "@ui5/webcomponents-react/Page";
import { Title } from "@ui5/webcomponents-react/Title";
import preview from "../../.storybook/preview";

const body = (
	<div style={{ padding: "16px", color: "var(--sapTextColor)" }}>
		Page content scrolls between the fixed header and footer.
	</div>
);

const meta = preview.meta({
	component: Page,
	tags: ["doc-only"],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		style: { height: "320px" },
		header: (
			<Bar>
				<Title slot="startContent" level="H4" size="H5">
					Entity profile
				</Title>
			</Bar>
		),
		children: body,
	},
});

export default meta;

export const Default = meta.story({});

export const WithFooter = meta.story({
	args: {
		footer: (
			<Bar>
				<Button slot="endContent" design="Emphasized">
					Save
				</Button>
				<Button slot="endContent">Cancel</Button>
			</Bar>
		),
	},
});

export const TransparentBackground = meta.story({
	args: {
		backgroundDesign: "Transparent",
	},
});
