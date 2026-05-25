import type { Panel } from "@ui5/webcomponents-react/Panel";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Panel.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Panel` — no Reltio
 * wrapping or prop renaming. Panel is the SAP equivalent of an accordion
 * item: a collapsible section with a header and a content area.
 */
export type PanelProps = ComponentPropsWithoutRef<typeof Panel>;
