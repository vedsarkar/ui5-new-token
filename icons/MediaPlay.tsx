import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MediaPlay = ({
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
			<path d="M4.19678 1.14193L12.6968 7.39519C13.0977 7.69015 13.0977 8.30985 12.6968 8.60481L4.19678 14.8581C3.71123 15.2152 3.00244 14.856 3.00244 14.2533V1.74674C3.00244 1.14401 3.71123 0.784838 4.19678 1.14193ZM4.50244 12.7691L10.9858 8L4.50244 3.22993V12.7691Z" />
		</svg>
	);
};
