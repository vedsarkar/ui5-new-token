import type { ListItemStandard } from "@ui5/webcomponents-react/ListItemStandard";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed list row — the single canonical item entity for `List`.
 *
 * Backed by SAP Fiori `ListItemStandard` and exported as `ListItem`. Reltio
 * deliberately endorses one item entity instead of UI5's `ListItemStandard` /
 * `ListItemCustom` split: a row is customised through props (`icon`,
 * `description`, `additionalText`, `type`, …) and through `children` for
 * custom formatted content. UI5's `ListItemCustom` is intentionally not
 * endorsed. See README for the rationale and customization guidance.
 */
export type ListItemProps = ComponentPropsWithoutRef<typeof ListItemStandard>;
