import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ExpandGroup = ({
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
			<path d="M11.7052 8.23691C11.9896 7.93583 12.4637 7.92235 12.7648 8.20663C13.0655 8.49102 13.0793 8.96517 12.7951 9.2662L8.54796 13.7662C8.2559 14.0756 7.74935 14.075 7.45712 13.7662L3.20508 9.2662C2.92073 8.96513 2.93434 8.49108 3.23536 8.20663C3.53643 7.9223 4.0105 7.9359 4.29495 8.23691L8.00303 12.1588L11.7052 8.23691ZM11.7052 2.2369C11.9896 1.93583 12.4637 1.92235 12.7648 2.20663C13.0655 2.49102 13.0793 2.96517 12.7951 3.2662L8.54796 7.7662C8.2559 8.07559 7.74935 8.07499 7.45712 7.7662L3.20508 3.2662C2.92073 2.96513 2.93434 2.49107 3.23536 2.20663C3.53643 1.9223 4.0105 1.93589 4.29495 2.2369L8.00303 6.15878L11.7052 2.2369Z" />
		</svg>
	);
};
