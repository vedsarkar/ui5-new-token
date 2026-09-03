// url=https://www.figma.com/design/ZEQYMxTRj16hyKQrxOjkDJ/Fiori-New-Tokens?node-id=285220-5418
// source=components/ShellBar/ShellBar.tsx
// component=ShellBar
import figma from "figma";

const instance = figma.selectedInstance;

// The wrapper renders the hamburger toggle itself whenever a `sideNavigation`
// element is supplied, and owns the drawer's open state — there is no separate
// "show hamburger" prop, so the Figma variant maps to the slot's presence.
const hamburger = instance.getEnum("Hamburger", { False: false, True: true });
const notification = instance.getBoolean("Notification");
const productSwitch = instance.getBoolean("Product Switch");
const extraLeftArea = instance.getBoolean("Extra Left Area");
const extraRightArea = instance.getBoolean("Extra Right Area");

// Slot values are emitted as identifiers the developer supplies rather than
// invented markup: these Figma properties are booleans, so there is no instance
// to resolve and no content to copy.
const sideNavigation = hamburger
	? figma.code`
	sideNavigation={sideNavigation}`
	: "";
const tenantSelector = extraLeftArea
	? figma.code`
	tenantSelector={tenantSelector}`
	: "";
const notifications = notification
	? figma.code`
	notificationsUrl={notificationsUrl}`
	: "";
const appSelector = productSwitch
	? figma.code`
	appSelector={appSelector}`
	: "";
const actions = extraRightArea
	? figma.code`
	{actions}`
	: "";

// Figma properties with no counterpart on `ShellBarProps` are omitted rather
// than mapped onto invented props: Back Button, Shell Search, Joule, Feedback,
// Overflow, Help, Walk me, Support, the two Extra Actions, and Size. The
// wrapper documents most of these as deliberately unexposed.
export default {
	example: figma.code`
<ShellBar
	primaryTitle={title}${sideNavigation}${tenantSelector}${notifications}${appSelector}
	userMenu={userMenu}
>${actions}
</ShellBar>`,
	imports: ['import { ShellBar } from "@reltio/design/components"'],
	id: "shell-bar",
	metadata: { nestable: false },
};
