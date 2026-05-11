import type { StepInput } from "@ui5/webcomponents-react/StepInput";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori StepInput.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/StepInput` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `step`, `min`/`max`, fractional precision, and
 * when to prefer a `Slider` or plain `Input type="Number"` instead.
 */
export type StepInputProps = ComponentPropsWithoutRef<typeof StepInput>;
