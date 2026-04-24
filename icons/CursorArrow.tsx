import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CursorArrow = ({
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
			<path d="M5.21671 1.15798L13.7229 7.90987C14.2102 8.297 14.0222 9.10367 13.4131 9.23345L10.1236 9.93192L11.9228 13.4243C12.1137 13.7954 11.9566 14.2637 11.5807 14.4446L10.58 14.9259C10.2105 15.1034 9.76579 14.9513 9.5822 14.5845L7.77522 10.9698L5.19228 12.8559C4.70554 13.2106 4.00022 12.8509 4 12.2484V1.74689C4 1.13162 4.73494 0.775865 5.21671 1.15798ZM5.50109 10.7713L8.12704 8.85976C8.1952 8.82025 8.26957 8.79213 8.34692 8.77563L11.5407 8.09476L5.50109 3.30133V10.7713Z" />
		</svg>
	);
};
