import {MarkdownRenderer} from "@/components/MarkdownRenderer";
import {classNames} from "@/utils/classNames";
import styles from "./UserMessage.module.css";
import type {UserMessageProps} from "./UserMessage.types";

/**
 * UserMessage Component
 *
 * Displays user-authored message content with Markdown support via MarkdownRenderer.
 * Empty or null content renders an empty container; invalid Markdown is handled by MarkdownRenderer.
 */
export const UserMessage = ({
	children,
	className,
	style,
	...rest
}: UserMessageProps) => {
	const hasContent = children != null && String(children).trim() !== "";

	return (
		<div
			className={classNames(styles.userMessageRoot, className)}
			style={style}
			{...rest}
		>
			{hasContent && <MarkdownRenderer>{children}</MarkdownRenderer>}
		</div>
	);
};
