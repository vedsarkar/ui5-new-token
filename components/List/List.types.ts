import type { List } from "@ui5/webcomponents-react/List";
import type { ListItemGroup } from "@ui5/webcomponents-react/ListItemGroup";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori List.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/List` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on selection modes, grouping, and when to prefer
 * this over a Table. Compose rows with `ListItem` (and `ListItemGroup`
 * for sectioned lists).
 */
export type ListProps = ComponentPropsWithoutRef<typeof List>;

/**
 * Reltio-endorsed SAP Fiori ListItemGroup.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ListItemGroup` — no
 * Reltio wrapping or prop renaming. Groups a set of `ListItem`s under a
 * header label without affecting selection behaviour.
 */
export type ListItemGroupProps = ComponentPropsWithoutRef<typeof ListItemGroup>;
