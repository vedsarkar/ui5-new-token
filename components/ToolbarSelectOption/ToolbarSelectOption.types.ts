import type { ToolbarSelectOption } from "@ui5/webcomponents-react/ToolbarSelectOption";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ToolbarSelectOption.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ToolbarSelectOption` — no Reltio
 * wrapping or prop renaming. Used within `Toolbar`. See README.
 */
export type ToolbarSelectOptionProps = ComponentPropsWithoutRef<
	typeof ToolbarSelectOption
>;
