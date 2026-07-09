import { faker } from "@faker-js/faker";
import { Label } from "@ui5/webcomponents-react/Label";
import { Title } from "@ui5/webcomponents-react/Title";
import { Bar, Button } from "@/components";
import actionSettingsIcon from "@/icons/sap/action-settings";
import filterIcon from "@/icons/sap/filter";
import sortIcon from "@/icons/sap/sort";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Bar,
	tags: ["doc-only"],
	parameters: {
		layout: "padded",
	},
});

export default meta;

export const Default = meta.story({
	args: {
		design: "Header",
		startContent: <Title>{faker.company.name()}</Title>,
		children: <Label>{faker.commerce.department()} Overview</Label>,
		endContent: (
			<>
				<Button design="Transparent" icon={actionSettingsIcon}>
					Settings
				</Button>
				<Button design="Emphasized">Save</Button>
			</>
		),
	},
});

export const Subheader = meta.story({
	args: {
		design: "Subheader",
		startContent: (
			<Button design="Transparent" icon={filterIcon}>
				Filter
			</Button>
		),
		children: <Label>{faker.number.int({ min: 1, max: 500 })} results</Label>,
		endContent: (
			<Button design="Transparent" icon={sortIcon}>
				Sort
			</Button>
		),
	},
});

export const Footer = meta.story({
	args: {
		design: "Footer",
		startContent: <Button design="Transparent">Cancel</Button>,
		endContent: (
			<>
				<Button design="Default">Draft</Button>
				<Button design="Emphasized">Submit</Button>
			</>
		),
	},
});

export const FloatingFooter = meta.story({
	args: {
		design: "FloatingFooter",
		startContent: <Button design="Transparent">Cancel</Button>,
		endContent: (
			<>
				<Button design="Default">Save as Draft</Button>
				<Button design="Emphasized">Publish</Button>
			</>
		),
	},
});
