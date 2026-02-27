import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const KeyboardArrowDown = ({
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
			<path d="M9.99994 13.0538L4.34619 7.4L5.39994 6.34625L9.99994 10.9463L14.5999 6.34625L15.6537 7.4L9.99994 13.0538Z" />
		</svg>
	);
};
