import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Done = ({
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
			<path d="M7.99996 14.0442L4.35571 10.4L5.39996 9.35574L7.99996 11.9557L14.6 5.35574L15.6442 6.39999L7.99996 14.0442Z" />
		</svg>
	);
};
