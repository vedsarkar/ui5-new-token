import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Locked = ({
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
			<path d="M8 0C10.1866 0 12 1.7489 12 3.93555V7H12.25C13.2165 7 14 7.7835 14 8.75V14.25C14 15.2165 13.2165 16 12.25 16H3.75C2.7835 16 2 15.2165 2 14.25V8.75C2 7.7835 2.7835 7 3.75 7H4V3.93555C4 1.7604 5.81185 1.51842e-07 8 0ZM3.75 8.5C3.61193 8.5 3.5 8.61193 3.5 8.75V14.25C3.5 14.3881 3.61193 14.5 3.75 14.5H12.25C12.3881 14.5 12.5 14.3881 12.5 14.25V8.75C12.5 8.61193 12.3881 8.5 12.25 8.5H3.75ZM8 10C8.82843 10 9.5 10.6716 9.5 11.5C9.5 12.3284 8.82843 13 8 13C7.17157 13 6.5 12.3284 6.5 11.5C6.5 10.6716 7.17157 10 8 10ZM8 1.5C6.61315 1.5 5.5 2.61569 5.5 3.93555V7H10.5V3.93555C10.5 2.60722 9.38839 1.5 8 1.5Z" />
		</svg>
	);
};
