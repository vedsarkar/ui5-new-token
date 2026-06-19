import type { SplitterElement } from "@ui5/webcomponents-react/SplitterElement";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori SplitterElement.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/SplitterElement` — no Reltio
 * wrapping or prop renaming. Used within `SplitterLayout`. See README.
 */
export type SplitterElementProps = ComponentPropsWithoutRef<
	typeof SplitterElement
>;
