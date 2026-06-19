import type { Token } from "@ui5/webcomponents-react/Token";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Token.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Token` — no Reltio
 * wrapping or prop renaming. Used within `MultiInput`. See README.
 */
export type TokenProps = ComponentPropsWithoutRef<typeof Token>;
