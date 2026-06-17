import type { Label } from "@ui5/webcomponents-react/Label";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Label.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Label` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on the `for` association, `required` asterisk, and `showColon`
 * conventions in Reltio forms.
 */
export type LabelProps = ComponentPropsWithoutRef<typeof Label>;
