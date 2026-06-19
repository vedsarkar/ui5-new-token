import type { ToolbarItem } from "@ui5/webcomponents-react/ToolbarItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ToolbarItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ToolbarItem` — no Reltio
 * wrapping or prop renaming. Used within `Toolbar`. See README.
 */
export type ToolbarItemProps = ComponentPropsWithoutRef<typeof ToolbarItem>;
