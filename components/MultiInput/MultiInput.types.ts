import type { MultiInput } from "@ui5/webcomponents-react/MultiInput";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MultiInput.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MultiInput` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on creating tokens, showing a value-help dialog,
 * and pairing with `Token` and suggestion children.
 */
export type MultiInputProps = ComponentPropsWithoutRef<typeof MultiInput>;
