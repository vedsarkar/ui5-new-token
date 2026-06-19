import type { Card } from "@ui5/webcomponents-react/Card";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Card.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Card` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for composing the `header` slot with `CardHeader` and content.
 */
export type CardProps = ComponentPropsWithoutRef<typeof Card>;
