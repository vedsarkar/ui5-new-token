import type { DynamicSideContent } from "@ui5/webcomponents-react/DynamicSideContent";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori DynamicSideContent.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/DynamicSideContent` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the responsive main/side layout behavior.
 */
export type DynamicSideContentProps = ComponentPropsWithoutRef<
	typeof DynamicSideContent
>;
