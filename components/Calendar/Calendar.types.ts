import type { Calendar } from "@ui5/webcomponents-react/Calendar";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Calendar.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Calendar` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on selection modes, secondary calendar types, and pairing
 * with `CalendarDate` / `CalendarDateRange` children.
 */
export type CalendarProps = ComponentPropsWithoutRef<typeof Calendar>;
