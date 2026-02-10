import type React from "react";
import {ErrorMessage} from "@/components/ErrorMessage";
import {MarkdownRenderer} from "@/components/MarkdownRenderer";
import {classNames} from "@/utils/classNames";
import styles from "./AssistantMessage.module.css";
import type {AssistantMessageProps} from "./AssistantMessage.types";

const normalizeError = (errorMessage: React.ReactNode | null): React.ReactNode | null => {
	if (errorMessage == null) {
		return null;
	}
	if (typeof errorMessage === "string") {
		const trimmed = errorMessage.trim();
		return trimmed ? <ErrorMessage message={trimmed} /> : null;
	}
	return errorMessage;
};

/**
 * AssistantMessage Component
 *
 * Displays assistant-authored message content with Markdown and MDX support via the unified MarkdownRenderer.
 * When error is true, shows ErrorMessage and hides content.
 */
export const AssistantMessage = ({
	children,
	errorMessage,
	className,
	style,
	...rest
}: React.PropsWithChildren<AssistantMessageProps>) => {
	const errorNode = normalizeError(errorMessage);
	const content = children.trim();

	return (
		<div
			className={classNames(styles.assistantMessageRoot, className)}
			style={style}
			{...rest}
		>
			{errorNode && <div className={styles.errorWrapper}>{errorNode}</div>}
			{!errorNode && content && <MarkdownRenderer>{content}</MarkdownRenderer>}
		</div>
	);
};
