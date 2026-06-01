import type { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import type { ComponentPropsWithoutRef, ReactElement } from "react";

type Ui5ShellBarProps = ComponentPropsWithoutRef<typeof Ui5ShellBar>;

/**
 * Reltio ShellBar — top navigation chrome with a default Reltio brand mark
 * in the left `branding` slot.
 *
 * Wraps `@ui5/webcomponents-react/ShellBar` and adds:
 * - default `branding` slot rendering a `ShellBarBranding` with the Reltio
 *   brand mark, switching between `horizon-light` and `horizon-dark`
 *   variants based on the closest `[data-theme]` ancestor
 * - `branding?: ReactNode` override prop for sub-apps that want their own mark
 * - `tenantSelector` / `userMenu` Reltio slot props (see below)
 * - `data-test-id` forwarding to the rendered light-DOM host
 *
 * The UI5 `logo` slot is a separate concern (it now lives near the profile
 * in UI5 2.21+) and remains available as a regular pass-through prop.
 *
 * Every other UI5 ShellBar prop (`primaryTitle`, `secondaryTitle`,
 * `startButton`, `searchField`, …) passes through unchanged.
 */
export type ShellBarProps = Omit<Ui5ShellBarProps, "branding"> & {
	/**
	 * Override the default Reltio branding (left brand mark + optional title).
	 * Must be a `<ShellBarBranding>` element (or any React element that UI5
	 * recognises as the `branding` slot child). Primitive types (string, null)
	 * are silently discarded by UI5's slot validation — pass an element only.
	 */
	branding?: ReactElement;
	/**
	 * Tenant picker rendered into the UI5 ShellBar `content` slot, so it sits in
	 * the content area just after the branding/title (left cluster) rather than
	 * in the right actions cluster. Intended to host a `<TenantSelector>`
	 * element; the type is the generic `ReactElement` and the wrapper does not
	 * enforce the runtime element type. Takes precedence over a directly-supplied
	 * `content` prop.
	 */
	tenantSelector?: ReactElement;
	/**
	 * User menu rendered into the UI5 ShellBar `profile` slot. Intended to host a
	 * `<UserMenu>` element whose inner avatar carries `slot="profile"`, so UI5's
	 * slot routing mounts the avatar in the canonical profile position while the
	 * popover and About modal render as overlays. The type is the generic
	 * `ReactElement` and the wrapper does not enforce the runtime element type.
	 *
	 * Precedence: an explicit `profile` prop wins — when both are supplied, the
	 * `userMenu` element is not rendered.
	 */
	userMenu?: ReactElement;
};
