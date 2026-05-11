import type { CheckBox } from "@ui5/webcomponents-react/CheckBox";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori CheckBox.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/CheckBox` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on labeling, partial state, and form integration.
 */
export type CheckBoxProps = ComponentPropsWithoutRef<typeof CheckBox>;
