import type { MultiComboBox } from "@ui5/webcomponents-react/MultiComboBox";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MultiComboBox.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MultiComboBox` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on filtering, the "Select All" option, and pairing
 * with `MultiComboBoxItem` / `MultiComboBoxItemGroup` children.
 */
export type MultiComboBoxProps = ComponentPropsWithoutRef<typeof MultiComboBox>;
