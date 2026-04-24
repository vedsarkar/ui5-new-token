import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const NavigationRightArrow = ({
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
			<path d="M5.20493 3.23532C5.48927 2.93424 5.96333 2.92076 6.2645 3.20504L10.7645 7.45211C10.9144 7.59365 10.9997 7.79085 10.9998 7.99704C10.9999 8.20338 10.9145 8.40121 10.7645 8.54293L6.2645 12.7949C5.96343 13.0792 5.48937 13.0656 5.20493 12.7646C4.92058 12.4635 4.93419 11.9895 5.2352 11.705L9.15707 7.99704L5.2352 4.29489C4.93413 4.01054 4.92064 3.53648 5.20493 3.23532Z" />
		</svg>
	);
};
