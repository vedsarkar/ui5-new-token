import type { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Toolbar.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Toolbar` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `ToolbarButton`, `ToolbarSelect`, `ToolbarSeparator`, and `ToolbarSpacer`.
 */
export type ToolbarProps = ComponentPropsWithoutRef<typeof Toolbar>;
