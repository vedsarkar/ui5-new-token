import { ErrorCircle } from "@/icons";
import { classNames } from "@/utils/classNames";
import styles from "./ErrorMessage.module.css";
import type { ErrorMessageProps } from "./ErrorMessage.types";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

/**
 * ErrorMessage Component
 *
 * Displays a standardized error message with optional ErrorCircle icon.
 * Uses role="alert" and aria-live for screen reader announcements.
 */
export const ErrorMessage = ({
	message,
	showIcon = true,
	className,
	style,
	...rest
}: ErrorMessageProps) => {
	const displayMessage =
		message != null && String(message).trim() !== ""
			? String(message).trim()
			: DEFAULT_MESSAGE;

	return (
		<div
			className={classNames(styles.root, className)}
			style={style}
			role="alert"
			aria-live="polite"
			{...rest}
		>
			{showIcon && (
				<span className={styles.iconWrapper} aria-hidden="true">
					<ErrorCircle size="small" color="error" />
				</span>
			)}
			<p className={styles.text}>{displayMessage}</p>
		</div>
	);
};
