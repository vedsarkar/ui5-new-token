import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Female = ({
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
			<path d="M8 0C10.4853 0 12.5 2.01472 12.5 4.5C12.5 6.72968 10.8782 8.57938 8.75 8.93652V11H11.25C11.6642 11 12 11.3358 12 11.75C12 12.1642 11.6642 12.5 11.25 12.5H8.75V15.25C8.75 15.6642 8.41421 16 8 16C7.58579 16 7.25 15.6642 7.25 15.25V12.5H4.75C4.33579 12.5 4 12.1642 4 11.75C4 11.3358 4.33579 11 4.75 11H7.25V8.93652C5.12182 8.57938 3.5 6.72968 3.5 4.5C3.5 2.01472 5.51472 0 8 0ZM8 1.5C6.34315 1.5 5 2.84315 5 4.5C5 6.15685 6.34315 7.5 8 7.5C9.65685 7.5 11 6.15685 11 4.5C11 2.84315 9.65685 1.5 8 1.5Z" />
		</svg>
	);
};
