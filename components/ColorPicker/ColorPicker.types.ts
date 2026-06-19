import type { ColorPicker } from "@ui5/webcomponents-react/ColorPicker";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ColorPicker.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ColorPicker` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the full vs `simplified` picker and the `value` color format.
 */
export type ColorPickerProps = ComponentPropsWithoutRef<typeof ColorPicker>;
