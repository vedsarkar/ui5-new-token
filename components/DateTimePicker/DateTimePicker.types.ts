import type { DateTimePicker } from "@ui5/webcomponents-react/DateTimePicker";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori DateTimePicker.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/DateTimePicker` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `formatPattern`, time-zone handling, and 12/24-hour
 * display.
 */
export type DateTimePickerProps = ComponentPropsWithoutRef<
	typeof DateTimePicker
>;
