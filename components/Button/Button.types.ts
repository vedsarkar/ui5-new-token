import type { Button } from "@ui5/webcomponents-react/Button";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Button.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Button` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on when to pick which `design` variant.
 */
export type ButtonProps = ComponentPropsWithoutRef<typeof Button>;
