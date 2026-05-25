import type { ResponsivePopover } from "@ui5/webcomponents-react/ResponsivePopover";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ResponsivePopover.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ResponsivePopover` —
 * no Reltio wrapping or prop renaming. The component behaves like a
 * `Popover` on desktop and a `Dialog` on phones; use it for menus and
 * pickers that should work on both form factors with a single API.
 */
export type ResponsivePopoverProps = ComponentPropsWithoutRef<
	typeof ResponsivePopover
>;
