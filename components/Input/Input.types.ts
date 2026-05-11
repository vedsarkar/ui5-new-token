import type { Input } from "@ui5/webcomponents-react/Input";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Input.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Input` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on `type` semantics, suggestion lists, value-help icons,
 * and pairing with `SuggestionItem` / `SuggestionItemGroup` children.
 */
export type InputProps = ComponentPropsWithoutRef<typeof Input>;
