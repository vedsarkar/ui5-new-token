import type { DynamicDateRange } from "@ui5/webcomponents-react/DynamicDateRange";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori DynamicDateRange.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/DynamicDateRange` —
 * no Reltio wrapping or prop renaming. Use this re-export so apps depend
 * on `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on registering options, the option string format,
 * and converting values back to concrete `Date`s.
 */
export type DynamicDateRangeProps = ComponentPropsWithoutRef<
	typeof DynamicDateRange
>;
