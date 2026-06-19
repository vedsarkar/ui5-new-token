import type { CalendarDateRange } from "@ui5/webcomponents-react/CalendarDateRange";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori CalendarDateRange.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/CalendarDateRange` — no Reltio
 * wrapping or prop renaming. Used within `Calendar`. See README.
 */
export type CalendarDateRangeProps = ComponentPropsWithoutRef<
	typeof CalendarDateRange
>;
