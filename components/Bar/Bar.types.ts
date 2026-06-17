import type { Bar } from "@ui5/webcomponents-react/Bar";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Bar.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Bar` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `design` semantics and the three content slots.
 */
export type BarProps = ComponentPropsWithoutRef<typeof Bar>;
