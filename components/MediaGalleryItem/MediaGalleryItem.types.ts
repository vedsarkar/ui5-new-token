import type { MediaGalleryItem } from "@ui5/webcomponents-react/MediaGalleryItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MediaGalleryItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MediaGalleryItem` — no Reltio
 * wrapping or prop renaming. Used within `MediaGallery`. See README.
 */
export type MediaGalleryItemProps = ComponentPropsWithoutRef<
	typeof MediaGalleryItem
>;
