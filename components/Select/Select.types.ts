import type { Select } from "@ui5/webcomponents-react/Select";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Select.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Select` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `Option` children, when to prefer `ComboBox`,
 * and how to render rich option layouts with `OptionCustom`.
 */
export type SelectProps = ComponentPropsWithoutRef<typeof Select>;
