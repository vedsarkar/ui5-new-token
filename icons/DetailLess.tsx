import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const DetailLess = ({
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
			viewBox="0 0 16 16"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M14.25 5C14.6642 5 15 5.33579 15 5.75C15 6.16421 14.6642 6.5 14.25 6.5H7.75C7.33579 6.5 7 6.16421 7 5.75C7 5.33579 7.33579 5 7.75 5H14.25ZM14.25 2C14.6642 2 15 2.33579 15 2.75C15 3.16421 14.6642 3.5 14.25 3.5H1.75C1.33579 3.5 1 3.16421 1 2.75C1 2.33579 1.33579 2 1.75 2H14.25Z" />
		</svg>
	);
};
