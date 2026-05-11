import type { TimePicker } from "@ui5/webcomponents-react/TimePicker";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TimePicker.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TimePicker` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `formatPattern`, 12/24-hour display, and when
 * to prefer `DateTimePicker` instead.
 */
export type TimePickerProps = ComponentPropsWithoutRef<typeof TimePicker>;
