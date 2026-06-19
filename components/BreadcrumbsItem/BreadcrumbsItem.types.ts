import type { BreadcrumbsItem } from "@ui5/webcomponents-react/BreadcrumbsItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori BreadcrumbsItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/BreadcrumbsItem` — no Reltio
 * wrapping or prop renaming. Used within `Breadcrumbs`. See README.
 */
export type BreadcrumbsItemProps = ComponentPropsWithoutRef<
	typeof BreadcrumbsItem
>;
