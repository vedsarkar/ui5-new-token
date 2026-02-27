import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FilterSelect = ({
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
			<path d="M9.38477 17.5C9.13344 17.5 8.92319 17.4153 8.75402 17.246C8.58469 17.0768 8.50002 16.8666 8.50002 16.6152V10.827L2.90202 3.7155C2.70969 3.459 2.68177 3.19233 2.81827 2.9155C2.95494 2.6385 3.18544 2.5 3.50977 2.5H16.4903C16.8146 2.5 17.0451 2.6385 17.1818 2.9155C17.3183 3.19233 17.2904 3.459 17.098 3.7155L11.5 10.827V16.6152C11.5 16.8666 11.4154 17.0768 11.246 17.246C11.0769 17.4153 10.8666 17.5 10.6153 17.5H9.38477ZM10 10.3L14.95 4H5.05002L10 10.3Z" />
		</svg>
	);
};
