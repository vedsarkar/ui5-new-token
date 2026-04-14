import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const KeyboardArrowLeft = ({
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
			aria-hidden="true"
			{...props}
		>
			<path d="M11.9999 15.6538L6.34619 10L11.9999 4.34625L13.0537 5.4L8.45369 10L13.0537 14.6L11.9999 15.6538Z" />
		</svg>
	);
};
