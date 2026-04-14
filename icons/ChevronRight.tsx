import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ChevronRight = ({
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
			aria-hidden="true"
			{...props}
		>
			<path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
		</svg>
	);
};
