import type { SplitButton } from "@ui5/webcomponents-react/SplitButton";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori SplitButton.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/SplitButton` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `onClick` vs. `onArrowClick`, pairing with
 * `Menu` for the dropdown half, and when to prefer a plain `Button`.
 */
export type SplitButtonProps = ComponentPropsWithoutRef<typeof SplitButton>;
