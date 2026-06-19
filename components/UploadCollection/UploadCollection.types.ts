import type { UploadCollection } from "@ui5/webcomponents-react/UploadCollection";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori UploadCollection.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/UploadCollection` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `UploadCollectionItem`; see README.
 */
export type UploadCollectionProps = ComponentPropsWithoutRef<
	typeof UploadCollection
>;
