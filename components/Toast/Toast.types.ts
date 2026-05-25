import type { Toast } from "@ui5/webcomponents-react/Toast";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Toast.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Toast` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for the recommended pattern to render semantic info / success / error
 * variants via `--sap*` token overrides (no wrapper needed).
 */
export type ToastProps = ComponentPropsWithoutRef<typeof Toast>;
