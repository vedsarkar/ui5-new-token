import type { Slider } from "@ui5/webcomponents-react/Slider";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Slider.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Slider` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `step`, tickmarks, labels, and when to prefer
 * a `StepInput` or `Input type="Number"` instead.
 */
export type SliderProps = ComponentPropsWithoutRef<typeof Slider>;
