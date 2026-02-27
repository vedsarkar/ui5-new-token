import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const KeyboardArrowRight = ({
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
			<path d="M10.9462 10L6.34619 5.4L7.39994 4.34625L13.0537 10L7.39994 15.6538L6.34619 14.6L10.9462 10Z" />
		</svg>
	);
};
