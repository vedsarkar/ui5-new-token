import { AccountCircle, Attachment, Chat } from "@reltio/design/icons";
import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { Chip } from "../Chip";
import { Tabs } from "./Tabs";
import cssClasses from "./Tabs.module.css";

const defaultItems = [
	{ value: "tab1", label: "First Tab" },
	{ value: "tab2", label: "Second Tab" },
	{ value: "tab3", label: "Third Tab" },
];

const meta = preview.meta({
	component: Tabs,
	parameters: {
		layout: "padded",
		cssClasses,
	},
	args: {
		items: defaultItems,
		onChange: fn(),
	},
});

export const Default = meta.story({
	args: {
		items: defaultItems,
	},
});

export const WithSelectedTab = meta.story({
	args: {
		items: defaultItems,
		value: "tab2",
	},
});

export const WithDisabledTab = meta.story({
	args: {
		value: "tab1",
		items: [
			{ value: "tab1", label: "Enabled" },
			{ value: "tab2", label: "Disabled", disabled: true },
			{ value: "tab3", label: "Also Enabled" },
		],
	},
});

export const ManyTabs = meta.story({
	args: {
		value: "data-share",
		items: [
			{ value: "data-share", label: "DATA SHARE" },
			{ value: "zero-copy", label: "ZERO COPY" },
			{ value: "data-pipelines", label: "DATA PIPELINES" },
			{ value: "auth-methods", label: "AUTHENTICATION METHODS" },
			{ value: "settings", label: "SETTINGS" },
			{ value: "monitoring", label: "MONITORING" },
			{ value: "logs", label: "LOGS" },
		],
	},
});

export const WithCustomLabel = meta.story({
	args: {
		value: "tab2",
		items: [
			{
				value: "tab1",
				label: (
					<>
						<AccountCircle size="small" />
						<span>First Tab</span>
						<Chip size="small">12</Chip>
					</>
				),
			},
			{
				value: "tab2",
				label: (
					<>
						<Attachment size="small" />
						<span>Second Tab</span>
						<Chip size="small">23</Chip>
					</>
				),
			},
			{
				value: "tab3",
				label: (
					<>
						<Chat size="small" />
						<span>Third Tab</span>
						<Chip size="small">34</Chip>
					</>
				),
			},
		],
	},
});
