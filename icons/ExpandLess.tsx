import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ExpandLess = ({
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
			<path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z" />
		</svg>
	);
};
