import type { NumericSideIndicator } from "@ui5/webcomponents-react/NumericSideIndicator";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori NumericSideIndicator.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/NumericSideIndicator` —
 * no Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for usage as a secondary KPI beside a headline number.
 */
export type NumericSideIndicatorProps = ComponentPropsWithoutRef<
	typeof NumericSideIndicator
>;
