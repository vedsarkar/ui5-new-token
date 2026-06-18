import type { Tag } from "@ui5/webcomponents-react/Tag";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Tag.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Tag` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for choosing a semantic `design` vs a decorative `colorScheme`.
 */
export type TagProps = ComponentPropsWithoutRef<typeof Tag>;
