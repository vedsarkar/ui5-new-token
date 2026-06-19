import type { TimelineItem } from "@ui5/webcomponents-react/TimelineItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TimelineItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TimelineItem` — no Reltio
 * wrapping or prop renaming. Used within `Timeline`. See README.
 */
export type TimelineItemProps = ComponentPropsWithoutRef<typeof TimelineItem>;
