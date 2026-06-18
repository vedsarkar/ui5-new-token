import type { Title } from "@ui5/webcomponents-react/Title";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Title.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Title` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the difference between `level` (semantics) and `size` (appearance).
 */
export type TitleProps = ComponentPropsWithoutRef<typeof Title>;
