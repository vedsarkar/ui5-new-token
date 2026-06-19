import type { TimelineGroupItem } from "@ui5/webcomponents-react/TimelineGroupItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori TimelineGroupItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/TimelineGroupItem` — no Reltio
 * wrapping or prop renaming. Used within `Timeline`. See README.
 */
export type TimelineGroupItemProps = ComponentPropsWithoutRef<
	typeof TimelineGroupItem
>;
