import type { ObjectStatus } from "@ui5/webcomponents-react/ObjectStatus";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ObjectStatus.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ObjectStatus` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for choosing a semantic `state` and when to show the default state icon.
 */
export type ObjectStatusProps = ComponentPropsWithoutRef<typeof ObjectStatus>;
