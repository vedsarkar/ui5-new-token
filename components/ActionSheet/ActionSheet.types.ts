import type { ActionSheet } from "@ui5/webcomponents-react/ActionSheet";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori ActionSheet.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/ActionSheet` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Children are
 * `Button`s; see README for opening and mobile behavior.
 */
export type ActionSheetProps = ComponentPropsWithoutRef<typeof ActionSheet>;
