import type { SegmentedButton } from "@ui5/webcomponents-react/SegmentedButton";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori SegmentedButton.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/SegmentedButton` —
 * no Reltio wrapping or prop renaming. Use this re-export so apps depend
 * on `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on selection modes, icon-only vs. text segments,
 * and when to prefer a `Select` instead.
 */
export type SegmentedButtonProps = ComponentPropsWithoutRef<
	typeof SegmentedButton
>;
