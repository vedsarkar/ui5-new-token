import type { ShellBarSearch } from "@ui5/webcomponents-react/ShellBarSearch";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ShellBarSearch.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ShellBarSearch` — no Reltio
 * wrapping or prop renaming. Used within `ShellBar`. See README.
 */
export type ShellBarSearchProps = ComponentPropsWithoutRef<
	typeof ShellBarSearch
>;
