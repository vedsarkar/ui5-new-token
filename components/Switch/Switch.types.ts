import type { Switch } from "@ui5/webcomponents-react/Switch";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Switch.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Switch` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on when to prefer `CheckBox` and on the
 * `textOn` / `textOff` semantic-language convention.
 */
export type SwitchProps = ComponentPropsWithoutRef<typeof Switch>;
