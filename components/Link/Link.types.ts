import type { Link } from "@ui5/webcomponents-react/Link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Link.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Link` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for when to use `href` navigation vs an `onClick` action link.
 */
export type LinkProps = ComponentPropsWithoutRef<typeof Link>;
