import type { ColorPaletteItem } from "@ui5/webcomponents-react/ColorPaletteItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ColorPaletteItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ColorPaletteItem` — no Reltio
 * wrapping or prop renaming. Used within `ColorPalette`. See README.
 */
export type ColorPaletteItemProps = ComponentPropsWithoutRef<
	typeof ColorPaletteItem
>;
