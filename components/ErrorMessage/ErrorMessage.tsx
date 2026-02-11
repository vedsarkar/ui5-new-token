import { ErrorCircle } from "@/icons";
import { classNames } from "@/utils/classNames";
import styles from "./ErrorMessage.module.css";
import type { ErrorMessageProps } from "./ErrorMessage.types";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

/**
 * Displays a standardized error message.
 * Uses role="alert" and aria-live for screen reader announcements.
 */
export const ErrorMessage = ({
	children,
	className,
	...rest
}: ErrorMessageProps) => {
	return (
		<div
			className={classNames(styles.root, className)}
			role="alert"
			aria-live="polite"
			{...rest}
		>
			<span className={styles.iconWrapper} aria-hidden="true">
				<ErrorCircle size="small" color="error" />
			</span>
			<p className={styles.text}>{children || DEFAULT_MESSAGE}</p>
		</div>
	);
};
