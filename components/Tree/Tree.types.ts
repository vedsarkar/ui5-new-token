import type { Tree } from "@ui5/webcomponents-react/Tree";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Tree.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Tree` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on selection modes, lazy loading, and when to prefer
 * a Tree over a List. Compose nodes with `TreeItem`, nesting them to express
 * the hierarchy.
 */
export type TreeProps = ComponentPropsWithoutRef<typeof Tree>;
