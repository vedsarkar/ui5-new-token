import type { Timeline } from "@ui5/webcomponents-react/Timeline";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Timeline.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Timeline` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `TimelineItem` and `TimelineGroupItem`; see README.
 */
export type TimelineProps = ComponentPropsWithoutRef<typeof Timeline>;
