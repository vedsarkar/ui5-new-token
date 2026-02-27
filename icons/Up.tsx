import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Up = ({
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
			viewBox="0 0 20 20"
			fill="currentColor"
			{...props}
		>
			<path d="M9.24994 18.5V4.35375L7.39044 6.198L6.34619 5.15375L9.99994 1.5L13.6537 5.15375L12.6094 6.198L10.7499 4.35375V18.5H9.24994Z" />
		</svg>
	);
};
