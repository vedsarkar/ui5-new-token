import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const VerticalAlign = ({
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
			<path d="M2.5 3V1.5H17.5V3H2.5ZM9.25 18.5V8.20375L6.4 11.0538L5.34625 10L10 5.34625L14.6538 10L13.6 11.0538L10.75 8.20375V18.5H9.25Z" />
		</svg>
	);
};
