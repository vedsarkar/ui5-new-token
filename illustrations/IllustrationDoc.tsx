import type { IllustrationSize } from "./Illustration.types";

type IllustrationDocProps = {
	/** Illustration size variant. @default "dialog" */
	size?: IllustrationSize;
	/** Accessible label set on the wrapping element via `aria-label`. Falls back to the per-illustration default from the manifest. */
	title?: string;
	/** Extended description rendered into a screen-reader-only span. Falls back to the per-illustration default from the manifest. */
	description?: string;
};

/**
 * SVG illustration components from the Reltio Design illustration library.
 *
 * Import individual illustrations by name:
 *
 * ```tsx
 * import { NoData, EmptyList, Welcome } from "@reltio/design/illustrations";
 *
 * <NoData />
 * <EmptyList size="spot" />
 * <Welcome size="scene" title="Welcome aboard" />
 * ```
 *
 * Illustrations are mirrored verbatim from the upstream `SAP/ui5-webcomponents` project
 * (Apache 2.0). They use SAP `--sapContent_Illustrative_Color*` CSS variables for fills,
 * which resolve through `public/variables.css` and switch automatically with `data-theme`.
 *
 * All standard HTML `<div>` attributes are also supported via rest props.
 */
export const Illustration = (_props: IllustrationDocProps) => null;
