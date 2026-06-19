import type { Breadcrumbs } from "@ui5/webcomponents-react/Breadcrumbs";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Breadcrumbs.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Breadcrumbs` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose rows
 * with `BreadcrumbsItem`; see README for `design` and `separators`.
 */
export type BreadcrumbsProps = ComponentPropsWithoutRef<typeof Breadcrumbs>;
