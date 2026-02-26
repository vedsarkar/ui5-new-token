import {
	ArgTypes,
	Description as Desc,
	Stories,
	Subtitle,
	Title,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import type { IconProps } from "./Icon.types";
import { IconLibrary } from "./IconLibrary";
import { AccountCircle as IconRef, iconMap } from "./index";
import styles from "./IconStories.module.css";

type StoryProps = IconProps & { name: string };

const meta: Meta<StoryProps> = {
	title: "Icons",
	component: IconRef as React.FC,
	parameters: {
		layout: "centered",
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Desc />
					<h3>Props</h3>
					<ArgTypes />
					<IconLibrary />
					<Stories />
				</>
			),
		},
	},
	render: ({ name }) => {
		const Icon = iconMap[name];
		return (
			<div className={styles.story}>
				<Icon size="small" color="success" />
				<Icon />
				<Icon size="large" color="error" />
			</div>
		);
	},
};

export default meta;
type Story = StoryObj<StoryProps>;

export const AccountCircle: Story = { args: { name: "AccountCircle" } };

export const Add: Story = { args: { name: "Add" } };

export const ArrowBack: Story = { args: { name: "ArrowBack" } };

export const ArrowDropDown: Story = { args: { name: "ArrowDropDown" } };

export const ArrowDropUp: Story = { args: { name: "ArrowDropUp" } };

export const ArrowForward: Story = { args: { name: "ArrowForward" } };

export const ArrowLeft: Story = { args: { name: "ArrowLeft" } };

export const ArrowRight: Story = { args: { name: "ArrowRight" } };

export const Attachment: Story = { args: { name: "Attachment" } };

export const Chat: Story = { args: { name: "Chat" } };

export const Check: Story = { args: { name: "Check" } };

export const CheckCircle: Story = { args: { name: "CheckCircle" } };

export const ChevronLeft: Story = { args: { name: "ChevronLeft" } };

export const ChevronRight: Story = { args: { name: "ChevronRight" } };

export const Close: Story = { args: { name: "Close" } };

export const Comment: Story = { args: { name: "Comment" } };

export const ContentCopy: Story = { args: { name: "ContentCopy" } };

export const ContentPaste: Story = { args: { name: "ContentPaste" } };

export const Delete: Story = { args: { name: "Delete" } };

export const Description: Story = { args: { name: "Description" } };

export const Download: Story = { args: { name: "Download" } };

export const Edit: Story = { args: { name: "Edit" } };

export const Email: Story = { args: { name: "Email" } };

export const ErrorCircle: Story = { args: { name: "ErrorCircle" } };

export const ExpandLess: Story = { args: { name: "ExpandLess" } };

export const ExpandMore: Story = { args: { name: "ExpandMore" } };

export const FilterList: Story = { args: { name: "FilterList" } };

export const Folder: Story = { args: { name: "Folder" } };

export const Help: Story = { args: { name: "Help" } };

export const Info: Story = { args: { name: "Info" } };

export const KeyboardArrowDown: Story = { args: { name: "KeyboardArrowDown" } };

export const KeyboardArrowUp: Story = { args: { name: "KeyboardArrowUp" } };

export const Logout: Story = { args: { name: "Logout" } };

export const Menu: Story = { args: { name: "Menu" } };

export const Notifications: Story = { args: { name: "Notifications" } };

export const People: Story = { args: { name: "People" } };

export const Person: Story = { args: { name: "Person" } };

export const Refresh: Story = { args: { name: "Refresh" } };

export const Remove: Story = { args: { name: "Remove" } };

export const Save: Story = { args: { name: "Save" } };

export const Search: Story = { args: { name: "Search" } };

export const Settings: Story = { args: { name: "Settings" } };

export const Share: Story = { args: { name: "Share" } };

export const Sort: Story = { args: { name: "Sort" } };

export const Upload: Story = { args: { name: "Upload" } };

export const Visibility: Story = { args: { name: "Visibility" } };

export const VisibilityOff: Story = { args: { name: "VisibilityOff" } };

export const Warning: Story = { args: { name: "Warning" } };
