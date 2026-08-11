import type { Avatar } from "@ui5/webcomponents-react/Avatar";
import type { UserMenu } from "@ui5/webcomponents-react/UserMenu";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Ui5AvatarProps = ComponentPropsWithoutRef<typeof Avatar>;
type Ui5UserMenuProps = ComponentPropsWithoutRef<typeof UserMenu>;

export type UserMenuUser = {
	/** Full display name. Also the avatar's accessible name and the fallback source for derived initials. */
	username: string;
	/** Email address shown as the secondary line in the popover header. */
	email: string;
	/** Absolute URL to the user's photo. When provided, the avatar shows the image instead of initials. */
	avatarUrl?: string;
};

export type UserMenuProps = Omit<
	Ui5AvatarProps,
	"children" | "icon" | "initials" | "id" | "slot" | "onClick"
> & {
	/** The signed-in user. Drives the trigger avatar and the popover header. */
	user: UserMenuUser;
	/** Application version shown in the About dialog. This is the ONLY About field the
	 * consumer controls — the dialog title, copyright, and legal links are fixed inside
	 * the component so applications cannot alter Reltio's branding or legal references.
	 */
	appVersion: string;
	/** Fired when the user clicks Sign Out. Fire-and-forget: the component performs
	 * no navigation or cookie clearing — the consumer's auth flow owns what happens next.
	 */
	onSignOut: () => void;
	/** Additional popover menu items. Pass one or more `UserMenuItem` elements
	 * (after About, before Sign Out). Not validated at runtime — supported contract
	 * is flat `UserMenuItem`s only; `UserMenuItemGroup` and nested sub-menus are out of scope.
	 */
	children?: ReactNode;
	/** Fired when a custom (non-About) menu item is selected. Use `event.detail.item`
	 * to identify the item — for example read a `data-href` attribute. Not called for
	 * the built-in About item.
	 */
	onItemClick?: Ui5UserMenuProps["onItemClick"];
	/**
	 * Controlled open state of the popover. When provided (`true` or `false`),
	 * `UserMenu` switches to **controlled mode**: the avatar renders as a
	 * non-interactive image and the popover open/close state is driven
	 * entirely by this prop through `onOpenChange`. When omitted, `UserMenu`
	 * is **uncontrolled** — the avatar is interactive and clicking it toggles
	 * the popover internally.
	 *
	 * Used by `<ShellBar>` when it routes `userMenu` into UI5's native
	 * `profile` slot. UI5 wraps the profile-slot content in its own
	 * `<Button>` with a built-in click handler; putting an interactive avatar
	 * inside that wrapping button produces nested buttons, two competing
	 * accessible names, and dead keyboard activation. In controlled mode the
	 * avatar becomes a picture and the wrapping button owns interaction.
	 */
	open?: boolean;
	/**
	 * Called when the popover wants its `open` state to flip — clicking
	 * outside, pressing Escape, selecting a menu item, or clicking Sign Out.
	 * Wire this to the state that drives `open`. Ignored in uncontrolled
	 * mode.
	 */
	onOpenChange?: (open: boolean) => void;
};
