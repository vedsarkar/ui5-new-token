import type { ColorPalette } from "@ui5/webcomponents-react/ColorPalette";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ColorPalette.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ColorPalette` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `ColorPaletteItem`; `ColorPalettePopover` opens it from a trigger.
 */
export type ColorPaletteProps = ComponentPropsWithoutRef<typeof ColorPalette>;
