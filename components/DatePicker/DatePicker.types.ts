import type { DatePicker } from "@ui5/webcomponents-react/DatePicker";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori DatePicker.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/DatePicker` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `formatPattern`, `minDate` / `maxDate` constraints, and
 * locale handling.
 */
export type DatePickerProps = ComponentPropsWithoutRef<typeof DatePicker>;
