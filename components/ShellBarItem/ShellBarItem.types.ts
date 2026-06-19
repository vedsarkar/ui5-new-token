import type { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ShellBarItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ShellBarItem` — no Reltio
 * wrapping or prop renaming. Used within `ShellBar`. See README.
 */
export type ShellBarItemProps = ComponentPropsWithoutRef<typeof ShellBarItem>;
