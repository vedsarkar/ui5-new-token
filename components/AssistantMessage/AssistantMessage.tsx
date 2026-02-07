import type { MarkdownToJSX } from "markdown-to-jsx";
import type React from "react";
import { Button } from "@/components/Button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import type { OverrideProps } from "@/components/MarkdownRenderer/MarkdownRenderer.types";
import { classNames } from "@/utils/classNames";
import styles from "./AssistantMessage.module.css";
import type { AssistantMessageProps } from "./AssistantMessage.types";

/** Pass assistant message content color into the unified renderer so its text uses it. */
const contentColorStyle = {
	"--reltio-markdown-components-color-text":
		"var(--reltio-assistant-message-content-color, #0e0e25)",
} as React.CSSProperties;

/** Allowed components for MarkdownRenderer (maps HTML/custom tags to design system components). */
const allowedMarkdownComponents: MarkdownToJSX.Overrides = {
	button: ({
		node: _node,
		children,
		className,
		type,
		disabled,
		onClick,
		"aria-label": ariaLabel,
	}: OverrideProps<"button">) => (
		<Button
			className={classNames(className)}
			type={type}
			disabled={disabled}
			onClick={onClick}
			aria-label={ariaLabel}
		>
			{children}
		</Button>
	),
	Button: ({ node: _node, ...props }: { node?: unknown; [key: string]: unknown }) => (
		<Button {...(props as React.ComponentProps<typeof Button>)} />
	),
};

/**
 * AssistantMessage Component
 *
 * Displays assistant-authored message content with Markdown and MDX support via the unified MarkdownRenderer.
 * When error is true, shows ErrorMessage and hides content.
 */
export const AssistantMessage = ({
	content,
	error = false,
	errorMessage,
	className,
	style,
	...rest
}: AssistantMessageProps) => {
	const hasContent = content != null && String(content).trim() !== "";

	return (
		<div className={classNames(styles.root, className)} style={style} {...rest}>
			{error && (
				<div className={styles.errorWrapper}>
					<ErrorMessage message={errorMessage ?? undefined} />
				</div>
			)}
			{!error && hasContent && (
				<div className={styles.content}>
					<MarkdownRenderer
					content={content}
					components={allowedMarkdownComponents}
					style={contentColorStyle}
				/>
				</div>
			)}
		</div>
	);
};
