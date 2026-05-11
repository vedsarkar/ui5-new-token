import type { FileUploader } from "@ui5/webcomponents-react/FileUploader";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori FileUploader.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/FileUploader` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See
 * README for guidance on `accept`, multi-file uploads, programmatic
 * uploads via `FormData`, and pairing with a trigger Button.
 */
export type FileUploaderProps = ComponentPropsWithoutRef<typeof FileUploader>;
