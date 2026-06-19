import type { ShellBarBranding } from "@ui5/webcomponents-react/ShellBarBranding";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ShellBarBranding.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ShellBarBranding` — no Reltio
 * wrapping or prop renaming. Used within `ShellBar`. See README.
 */
export type ShellBarBrandingProps = ComponentPropsWithoutRef<
	typeof ShellBarBranding
>;
