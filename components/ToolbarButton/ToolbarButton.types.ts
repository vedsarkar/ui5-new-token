import type { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ToolbarButton.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ToolbarButton` — no Reltio
 * wrapping or prop renaming. Used within `Toolbar`. See README.
 */
export type ToolbarButtonProps = ComponentPropsWithoutRef<typeof ToolbarButton>;
