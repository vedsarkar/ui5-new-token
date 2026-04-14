import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const KeyboardArrowUp = ({
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
			<path d="M9.99994 8.45375L5.39994 13.0538L4.34619 12L9.99994 6.34625L15.6537 12L14.5999 13.0538L9.99994 8.45375Z" />
		</svg>
	);
};
