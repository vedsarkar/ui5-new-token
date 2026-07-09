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
};
