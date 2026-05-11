import type { DateRangePicker } from "@ui5/webcomponents-react/DateRangePicker";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori DateRangePicker.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/DateRangePicker` —
 * no Reltio wrapping or prop renaming. Use this re-export so apps depend
 * on `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on the `delimiter`, format patterns, and shared
 * min/max bounds.
 */
export type DateRangePickerProps = ComponentPropsWithoutRef<
	typeof DateRangePicker
>;
