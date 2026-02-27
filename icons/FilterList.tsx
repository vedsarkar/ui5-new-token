import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FilterList = ({
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
			<path d="M8.27875 15.5V14H11.7115V15.5H8.27875ZM4.404 10.75V9.25H15.5865V10.75H4.404ZM1.5 6V4.5H18.5V6H1.5Z" />
		</svg>
	);
};
