import type { HtmlProps } from "@/utils/types";

/**
 * The Profile screen takes no data props — it is a fidelity reference for the
 * Figma design, with its content in `profileData`. Native div props pass
 * through so a story or host can size and place it.
 */
export type ProfileProps = HtmlProps<"div", Record<never, never>>;
