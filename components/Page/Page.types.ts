import type { Page } from "@ui5/webcomponents-react/Page";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Page.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Page` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the `header`/`footer` slots and scrolling/background options.
 */
export type PageProps = ComponentPropsWithoutRef<typeof Page>;
