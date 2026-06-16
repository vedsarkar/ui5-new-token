import type { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

type Ui5ShellBarProps = ComponentPropsWithoutRef<typeof Ui5ShellBar>;

/**
 * Reltio ShellBar — top navigation chrome with a default Reltio brand mark
 * in the `logo` slot.
 *
 * Wraps `@ui5/webcomponents-react/ShellBar` and adds:
 * - default `logo` slot rendering the Reltio brand mark, switching between
 *   `horizon-light` and `horizon-dark` variants based on the closest
 *   `[data-theme]` ancestor
 * - `logo` override prop (the recommended customization path) for sub-apps
 *   that want their own mark
 * - `tenantSelector` / `userMenu` Reltio slot props (see below)
 * - `data-test-id` forwarding to the rendered light-DOM host
 *
 * The wrapper deliberately exposes a minimal surface. The remaining UI5
 * pass-through props are `primaryTitle`, `secondaryTitle`, `logo`,
 * `onLogoClick`, `content`, `children`, `className`, and `style`. All
 * deep-customization UI5 props (experimental slots, search, notifications,
 * product switch, menu items, profile, …) are intentionally omitted to keep
 * the component focused; dedicated Reltio props will be added when needed.
 *
 * The UI5 `startButton` slot is also not exposed: when a `sideNavigation`
 * element is supplied, `ShellBar` renders the hamburger toggle automatically
 * and owns the navigation's collapsed state.
 */
export type ShellBarProps = Omit<
	Ui5ShellBarProps,
	| "accessibilityAttributes"
	| "assistant"
	| "branding"
	| "disableSearchCollapse"
	| "hideSearchButton"
	| "menuItems"
	| "notificationsCount"
	| "onContentItemVisibilityChange"
	| "onMenuItemClick"
	| "onNotificationsClick"
	| "onProductSwitchClick"
	| "onProfileClick"
	| "onSearchButtonClick"
	| "onSearchFieldClear"
	| "onSearchFieldToggle"
	| "profile"
	| "searchField"
	| "showNotifications"
	| "showProductSwitch"
	| "showSearchField"
	| "startButton"
	| "waitForDefine"
> & {
	/**
	 * Side navigation for the application. Intended to host a UI5
	 * `<SideNavigation>` element. The type is the generic `ReactElement`; the
	 * wrapper does not enforce the runtime element type.
	 *
	 * When provided, `ShellBar` renders it as a fully encapsulated left drawer:
	 * a full-height panel that slides in from the left over a dimming backdrop
	 * covering the viewport. `ShellBar` automatically renders the hamburger toggle
	 * in the start area and owns the open/closed state — clicking the
	 * hamburger or the backdrop, or pressing `Escape`, toggles the drawer. The
	 * drawer behavior is not customizable.
	 */
	sideNavigation?: ReactElement;
	/**
	 * Tenant picker rendered into the UI5 ShellBar `content` slot, so it sits in
	 * the content area just after the branding/title (left cluster) rather than
	 * in the right actions cluster. Intended to host a `<TenantSelector>`
	 * element; the type is the generic `ReactElement` and the wrapper does not
	 * enforce the runtime element type. Composed with a directly-supplied
	 * `content` prop (the tenant selector renders first, then `content`) rather
	 * than replacing it.
	 */
	tenantSelector?: ReactElement;
	/**
	 * User menu rendered into the UI5 ShellBar `profile` slot. Intended to host a
	 * `<UserMenu>` element whose inner avatar carries `slot="profile"`, so UI5's
	 * slot routing mounts the avatar in the canonical profile position while the
	 * popover and About modal render as overlays. The type is the generic
	 * `ReactElement` and the wrapper does not enforce the runtime element type.
	 *
	 * This is the only way to populate the user area — the UI5 `profile` prop is
	 * intentionally not exposed.
	 */
	userMenu?: ReactElement;
};
