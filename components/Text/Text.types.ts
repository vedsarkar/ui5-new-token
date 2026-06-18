import type { Text } from "@ui5/webcomponents-react/Text";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Text.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Text` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `maxLines` truncation and the empty-value indicator.
 */
export type TextProps = ComponentPropsWithoutRef<typeof Text>;
