import type { HtmlProps } from "@/utils/types";

/**
 * The Data Quality screen takes no data props — it is a fidelity reference for
 * the Figma design, with its content in `dataQualityData`. Native div props
 * pass through so a story or host can size and place it.
 */
export type DataQualityProps = HtmlProps<"div", Record<never, never>>;
