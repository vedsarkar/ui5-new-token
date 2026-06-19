import type { RatingIndicator } from "@ui5/webcomponents-react/RatingIndicator";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori RatingIndicator.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/RatingIndicator` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for editable vs read-only usage and the `value`/`max` scale.
 */
export type RatingIndicatorProps = ComponentPropsWithoutRef<
	typeof RatingIndicator
>;
