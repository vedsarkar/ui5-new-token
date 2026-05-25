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
};
