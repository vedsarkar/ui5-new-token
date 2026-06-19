import type { ComboBoxItem } from "@ui5/webcomponents-react/ComboBoxItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ComboBoxItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ComboBoxItem` — no Reltio
 * wrapping or prop renaming. Used within `ComboBox`. See README.
 */
export type ComboBoxItemProps = ComponentPropsWithoutRef<typeof ComboBoxItem>;
