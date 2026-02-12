import { Markdown } from "@/components/Markdown";
import { classNames } from "@/utils/classNames";
import styles from "./UserMessage.module.css";
import type { UserMessageProps } from "./UserMessage.types";

/**
 * Displays user-authored message content with Markdown support via Markdown component.
 * Empty or null content renders an empty container; invalid Markdown is handled by Markdown component.
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
			{hasContent && <Markdown>{children}</Markdown>}
		</div>
	);
};
