import type { MenuItem } from "@ui5/webcomponents-react/MenuItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MenuItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MenuItem` — no Reltio
 * wrapping or prop renaming. Used within `Menu`. See README.
 */
export type MenuItemProps = ComponentPropsWithoutRef<typeof MenuItem>;
