import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Pin = ({
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
			<path d="M13.5 10.2115L15.2885 12V13.5H10.75V19L10 19.75L9.25005 19V13.5H4.71155V12L6.50005 10.2115V3H5.50005V1.5H14.5V3H13.5V10.2115ZM6.85005 12H13.15L12 10.85V3H8.00005V10.85L6.85005 12Z" />
		</svg>
	);
};
