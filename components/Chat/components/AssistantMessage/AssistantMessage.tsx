import { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
import type React from "react";
import { Markdown } from "@/components/Markdown";
import { classNames } from "@/utils/classNames";
import styles from "./AssistantMessage.module.css";
import type { AssistantMessageProps } from "./AssistantMessage.types";

const normalizeError = (
	errorMessage: React.ReactNode | null,
): React.ReactNode | null => {
	if (errorMessage == null) {
		return null;
	}
	if (typeof errorMessage === "string") {
		const trimmed = errorMessage.trim();
		return trimmed ? (
			<MessageStrip design="Negative" hideCloseButton>
				{trimmed}
			</MessageStrip>
		) : null;
	}
	return errorMessage;
};

/**
 * Displays assistant-authored message content with Markdown and MDX support via the Markdown component.
 * When error is true, shows ErrorMessage and hides content.
 */
export const AssistantMessage = ({
	children,
	errorMessage,
	className,
	style,
	...rest
}: AssistantMessageProps) => {
	const errorNode = normalizeError(errorMessage);
	const content = children.trim();

	return (
		<div
			className={classNames(styles.assistantMessageRoot, className)}
			style={style}
			{...rest}
		>
			{errorNode && errorNode}
			{!errorNode && content && <Markdown>{content}</Markdown>}
		</div>
	);
};
