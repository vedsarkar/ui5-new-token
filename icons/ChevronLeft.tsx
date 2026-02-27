import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ChevronLeft = ({
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
			<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
		</svg>
	);
};
