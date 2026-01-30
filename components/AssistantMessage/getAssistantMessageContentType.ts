/**
 * Content type result for assistant message rendering.
 */
export type AssistantMessageContentType = "mdx" | "markdown";

/**
 * Determines whether the given content should be rendered as MDX or Markdown.
 * Used by AssistantMessage to choose MarkdownRenderer vs MDXRenderer.
 *
 * Decision rules:
 * - If override is provided, return it.
 * - Else if content contains JSX-like patterns (e.g. `<Button>`, `</div>`), return "mdx".
 * - Else return "markdown".
 * - Empty, null, or whitespace-only content returns "markdown".
 *
 * @param content - Raw message content (may be empty).
 * @param override - Optional explicit content type; when provided, content is not inspected.
 * @returns "mdx" or "markdown"
 */
export const looksLikeMdx = (src: string) =>
	/<\/?[A-Z][A-Za-z0-9]*\b|{[^}]*}|^\s*(import|export)\s/m.test(src)

export function getAssistantMessageContentType(
	content: string | null | undefined,
	override?: AssistantMessageContentType,
): AssistantMessageContentType {
	if (override !== undefined && override !== null) {
		return override;
	}
	if (content == null || typeof content !== "string") {
		return "markdown";
	}
	const trimmed = content.trim();
	if (trimmed.length === 0) {
		return "markdown";
	}
	return looksLikeMdx(trimmed) ? "mdx" : "markdown";
}
