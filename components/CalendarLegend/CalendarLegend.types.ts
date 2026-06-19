import type { CalendarLegend } from "@ui5/webcomponents-react/CalendarLegend";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori CalendarLegend.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/CalendarLegend` — no Reltio
 * wrapping or prop renaming. Used within `Calendar`. See README.
 */
export type CalendarLegendProps = ComponentPropsWithoutRef<
	typeof CalendarLegend
>;
