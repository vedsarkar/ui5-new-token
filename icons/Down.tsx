import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Down = ({
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
			aria-hidden="true"
			{...props}
		>
			<path d="M9.24994 1.5V15.6462L7.39044 13.802L6.34619 14.8462L9.99994 18.5L13.6537 14.8462L12.6094 13.802L10.7499 15.6462V1.5H9.24994Z" />
		</svg>
	);
};
