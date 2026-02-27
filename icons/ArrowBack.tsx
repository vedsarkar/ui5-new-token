import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ArrowBack = ({
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
			viewBox="0 -960 960 960"
			fill="currentColor"
			{...props}
		>
			<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
		</svg>
	);
};
