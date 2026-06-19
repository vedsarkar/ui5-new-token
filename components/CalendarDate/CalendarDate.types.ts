import type { CalendarDate } from "@ui5/webcomponents-react/CalendarDate";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori CalendarDate.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/CalendarDate` — no Reltio
 * wrapping or prop renaming. Used within `Calendar`. See README.
 */
export type CalendarDateProps = ComponentPropsWithoutRef<typeof CalendarDate>;
