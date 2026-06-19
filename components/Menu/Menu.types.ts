import type { Menu } from "@ui5/webcomponents-react/Menu";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Menu.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Menu` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose items
 * with `MenuItem`, `MenuItemGroup`, and `MenuSeparator`; see README.
 */
export type MenuProps = ComponentPropsWithoutRef<typeof Menu>;
