import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Lightbulb = ({
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
			<path d="M10.25 14.5C10.6642 14.5 11 14.8358 11 15.25C11 15.6642 10.6642 16 10.25 16H5.75C5.33579 16 5 15.6642 5 15.25C5 14.8358 5.33579 14.5 5.75 14.5H10.25ZM8 0C10.9836 0 14 2.25287 14 5.5C14 7.17124 13.0551 8.25748 12.3369 9.16113C11.5977 10.0911 11 10.918 11 12.25C11 12.6642 10.6642 13 10.25 13H5.75C5.33579 13 5 12.6642 5 12.25C5 10.873 4.39625 10.023 3.66309 9.10059C2.9531 8.20731 2 7.13545 2 5.5C2 2.34097 5.00754 0 8 0ZM8 1.5C5.6415 1.5 3.5 3.35134 3.5 5.5C3.5 6.51834 4.04697 7.17312 4.83691 8.16699C5.49855 8.99944 6.25481 10.0061 6.4502 11.5H9.55176C9.75115 10.0399 10.5087 9.05086 11.1631 8.22754C11.9448 7.24396 12.5 6.56302 12.5 5.5C12.5 3.2786 10.3673 1.5 8 1.5Z" />
		</svg>
	);
};
