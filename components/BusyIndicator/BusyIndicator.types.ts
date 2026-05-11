import type { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori BusyIndicator.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/BusyIndicator` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `delay`, `text`, and the wrap-children pattern.
 */
export type BusyIndicatorProps = ComponentPropsWithoutRef<typeof BusyIndicator>;
