import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Button } from "@ui5/webcomponents-react/Button";
import { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import { ShellBarSearch } from "@ui5/webcomponents-react/ShellBarSearch";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import { ShellBar } from "./ShellBar";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";

const meta = preview.meta({
	component: ShellBar,
	parameters: { layout: "fullscreen" },
	args: {
		onLogoClick: fn(),
		onMenuItemClick: fn(),
		onNotificationsClick: fn(),
		onProductSwitchClick: fn(),
		onProfileClick: fn(),
		onSearchButtonClick: fn(),
		onSearchFieldClear: fn(),
		onSearchFieldToggle: fn(),
	},
});

export default meta;

export const Default = meta.story({
	args: {
		primaryTitle: "Console",
		notificationsCount: "10",
		showNotifications: true,
		startButton: <Button accessibleName="Menu" icon="menu2" tooltip="Menu" />,
		profile: <Avatar initials="Y" colorScheme="Accent4" />,
		searchField: (
			<ShellBarSearch placeholder="Search Apps, Products" showClearIcon />
		),
		children: <ShellBarItem icon="sys-help" text="Help" />,
	},
});

export const Minimal = meta.story({
	args: {
		primaryTitle: "Console",
		startButton: <Button accessibleName="Menu" icon="menu2" tooltip="Menu" />,
		profile: <Avatar initials="Y" colorScheme="Accent4" />,
	},
});

export const CustomBranding = meta.story({
	args: {
		primaryTitle: "Acme Module",
		startButton: <Button accessibleName="Menu" icon="menu2" tooltip="Menu" />,
		profile: <Avatar colorScheme="Accent2" />,
		logo: <Avatar initials="A" colorScheme="Accent1" size="XS" />,
	},
});
