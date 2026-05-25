import type { ProgressIndicator } from "@ui5/webcomponents-react/ProgressIndicator";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ProgressIndicator.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ProgressIndicator` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for usage guidance.
 */
export type ProgressIndicatorProps = ComponentPropsWithoutRef<
	typeof ProgressIndicator
>;
