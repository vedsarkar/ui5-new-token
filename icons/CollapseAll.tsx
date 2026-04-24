import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CollapseAll = ({
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
			<path d="M4.78025 2.21973L7.28025 4.71973C7.57306 5.01259 7.57303 5.48739 7.28025 5.78027C6.98736 6.07315 6.51259 6.07313 6.2197 5.78027L4.99997 4.56055V13.25C4.99997 13.6642 4.66415 14 4.24997 14C3.83576 14 3.49997 13.6642 3.49997 13.25V4.56055L2.28025 5.78027C1.98737 6.07316 1.5126 6.07312 1.2197 5.78027C0.926862 5.48738 0.926834 5.01261 1.2197 4.71973L3.7197 2.21973C4.00744 1.93203 4.47272 1.92188 4.78025 2.21973ZM14.25 2C14.6641 2.00005 15 2.33582 15 2.75C15 3.16418 14.6641 3.49995 14.25 3.5H9.74997C9.33576 3.5 8.99997 3.16421 8.99997 2.75C8.99997 2.33579 9.33576 2 9.74997 2H14.25Z" />
		</svg>
	);
};
