import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const UiNotifications = ({
	size = "medium",
	color = "inherited",
	className,
	...props
}: IconProps) => {
	return (
		<svg
			className={classNames(
				styles.root,
				styles[size],
				styles[color],
				className,
			)}
			viewBox="0 0 16 16"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M13.25 2C14.7688 2 16 3.23122 16 4.75V11.25C16 12.7688 14.7688 14 13.25 14H2.75C1.23122 14 2.0133e-08 12.7688 0 11.25V4.75C0 3.23122 1.23122 2 2.75 2H13.25ZM2.75 3.5C2.05964 3.5 1.5 4.05964 1.5 4.75V11.25C1.5 11.9404 2.05964 12.5 2.75 12.5H13.25C13.9404 12.5 14.5 11.9404 14.5 11.25V4.75C14.5 4.05964 13.9404 3.5 13.25 3.5H2.75ZM8.24609 8C8.66031 8 8.99609 8.33579 8.99609 8.75C8.99609 9.16421 8.66031 9.5 8.24609 9.5H4.75C4.33579 9.5 4 9.16421 4 8.75C4 8.33579 4.33579 8 4.75 8H8.24609ZM11.25 5C11.6642 5 12 5.33579 12 5.75C12 6.16421 11.6642 6.5 11.25 6.5H4.75C4.33579 6.5 4 6.16421 4 5.75C4 5.33579 4.33579 5 4.75 5H11.25Z" />
		</svg>
	);
};
