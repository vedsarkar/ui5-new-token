import type { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import type { ComponentPropsWithoutRef, ReactElement } from "react";
import type { AppEntry } from "../AppSelector";
import type { UserMenuProps } from "../UserMenu";

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
 * - `tenantSelector` composition prop rendered into UI5's `content` slot
 * - `userMenu` composition prop mapped onto UI5's native `profile` slot
 * - `notificationsUrl` prop that enables UI5's native notifications button
 *   and opens the given URL on click
 * - `apps`/`env`/`tenant` props that enable UI5's native product-switch
 *   button and render the app-catalog popover anchored to it
 * - `sideNavigation` composition prop that renders a hamburger-toggled
 *   left drawer with an Escape/backdrop close
 * - `data-test-id` forwarding to the rendered light-DOM host
 *
 * The wrapper deliberately exposes a minimal surface. The remaining UI5
 * pass-through props are `primaryTitle`, `secondaryTitle`, `logo`,
 * `onLogoClick`, `content`, `children`, `className`, and `style`. All
 * remaining deep-customization UI5 props (experimental slots, search,
 * menu items, …) are intentionally omitted to keep the component focused;
 * dedicated Reltio props will be added when needed.
 *
 * - `searchField` composition prop mapped onto UI5's native search slot
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
	 * User menu rendered into the UI5 ShellBar's native `profile` slot at the
	 * far right of the actions cluster. Intended to host a `<UserMenu>` element
	 * whose avatar becomes the profile-slot trigger while its popover and About
	 * modal are portaled to `document.body`. The profile slot is protected —
	 * UI5's overflow algorithm never hides it — so the avatar is always visible
	 * regardless of the viewport width.
	 *
	 * **Profile-slot a11y contract**: UI5 wraps the profile-slot content in its
	 * own `<Button data-profile-btn>` with a built-in click handler. To avoid
	 * nested-button and dual-focus, `<ShellBar>` clones the supplied element
	 * with `open` and `onOpenChange` props so the inner Avatar can render
	 * non-interactive and popover open/close flows through the outer UI5
	 * button. Any wrapper you place here **must forward `open` and
	 * `onOpenChange` down to the underlying `<UserMenu>`** — the prop type
	 * enforces that those keys exist in the element's props type, but
	 * forwarding is your responsibility. `<UserMenu>` used directly is the
	 * default and simplest way to satisfy the contract.
	 *
	 * The UI5 `profile` prop is intentionally not exposed directly.
	 */
	userMenu?: ReactElement<Pick<UserMenuProps, "open" | "onOpenChange">>;
	/**
	 * URL of the notifications page. When provided, `ShellBar` enables UI5's
	 * native notifications button (bell icon) in the right actions cluster;
	 * clicking it opens the given URL in a new browser tab. When omitted, no
	 * bell icon is shown.
	 */
	notificationsUrl?: string;
	/**
	 * Application catalog rendered inside the app-catalog popover anchored to
	 * UI5's native product-switch button (grid icon) in the right actions
	 * cluster. When provided, `ShellBar` enables the product-switch button and
	 * owns the popover's open/close state — clicking the button toggles the
	 * popover, and selecting an application closes it.
	 *
	 * **Requires** `env` and `tenant` to resolve `${environment}` and `${tenant}`
	 * placeholders inside each app's `uri`. When `apps` is provided without
	 * `env`/`tenant`, the placeholders are replaced with the literal string
	 * `"undefined"`, which almost certainly breaks the target URL.
	 */
	apps?: AppEntry[];
	/**
	 * Environment identifier substituted into each app's `uri` template
	 * (`${environment}` placeholder). Must be provided whenever `apps` is set;
	 * ignored otherwise.
	 */
	env?: string;
	/**
	 * Tenant identifier substituted into each app's `uri` template (`${tenant}`
	 * placeholder). Must be provided whenever `apps` is set; ignored otherwise.
	 */
	tenant?: string;
	/**
	 * Legacy application-selector element rendered as a UI5 ShellBar default
	 * slot child alongside `userMenu`. Kept for backwards compatibility with
	 * existing consumers. When both `appSelector` and `apps` are supplied,
	 * `apps` wins and `appSelector` is ignored.
	 *
	 * @deprecated Redundant with the ShellBar API — the same affordance can be
	 * produced either by passing a `<ShellBarItem>` directly as a child of
	 * `<ShellBar>`, or by using the new `apps` / `env` / `tenant` props for
	 * the fully managed product-switch integration. **RP-194777
	 * (overflow-loop) is not fixed on this path**: to preserve the current
	 * visual order, the deprecated
	 * branch keeps `<UserMenu>` in UI5's default children slot, and
	 * `<ui5-avatar>` is not a `ShellBarItem` so UI5's overflow algorithm
	 * still loops on it at narrow viewports. Migrate to `apps` / `env` /
	 * `tenant` to receive the fix. The `appSelector` prop itself is scheduled
	 * for removal in the next major.
	 */
	appSelector?: ReactElement;
	/**
	 * Search field rendered into the UI5 ShellBar's native search slot, between
	 * the content area and the right actions cluster. Intended to host a UI5
	 * `<Input>` or `<ShellBarSearch>`; the type is the generic `ReactElement`
	 * and the wrapper does not enforce the runtime element type.
	 *
	 * Supplying it also turns on UI5's search affordance — the wrapper sets
	 * `showSearchField` for you, so the field is visible rather than collapsed
	 * behind the magnifier button.
	 */
	searchField?: ReactElement;
};
