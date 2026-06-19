import type { FlexBox } from "@ui5/webcomponents-react/FlexBox";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori FlexBox.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/FlexBox` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for layout guidance (`direction`, `justifyContent`, `alignItems`, `gap`).
 */
export type FlexBoxProps = ComponentPropsWithoutRef<typeof FlexBox>;
