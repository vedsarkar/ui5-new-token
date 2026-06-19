import type { CardHeader } from "@ui5/webcomponents-react/CardHeader";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori CardHeader.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/CardHeader` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the `header` slot of `Card`.
 */
export type CardHeaderProps = ComponentPropsWithoutRef<typeof CardHeader>;
