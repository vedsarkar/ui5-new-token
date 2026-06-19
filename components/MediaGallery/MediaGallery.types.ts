import type { MediaGallery } from "@ui5/webcomponents-react/MediaGallery";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MediaGallery.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MediaGallery` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `MediaGalleryItem`; see README.
 */
export type MediaGalleryProps = ComponentPropsWithoutRef<typeof MediaGallery>;
