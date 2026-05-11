import type { RangeSlider } from "@ui5/webcomponents-react/RangeSlider";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori RangeSlider.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/RangeSlider` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `step`, tickmarks, labels, and how
 * `startValue` / `endValue` interact with `min` / `max`.
 */
export type RangeSliderProps = ComponentPropsWithoutRef<typeof RangeSlider>;
