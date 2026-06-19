import type { ToggleButton } from "@ui5/webcomponents-react/ToggleButton";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ToggleButton.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ToggleButton` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the `pressed` two-state model and when to prefer `Switch`.
 */
export type ToggleButtonProps = ComponentPropsWithoutRef<typeof ToggleButton>;
