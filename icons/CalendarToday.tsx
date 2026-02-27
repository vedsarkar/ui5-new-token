import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CalendarToday = ({
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
			<path d="M10 7C8.3425 7 7 8.3425 7 10C7 11.6575 8.3425 13 10 13C11.6575 13 13 11.6575 13 10C13 8.3425 11.6575 7 10 7Z" />
		</svg>
	);
};
