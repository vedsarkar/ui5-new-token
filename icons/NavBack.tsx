import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const NavBack = ({
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
			<path d="M10.7952 3.23532C10.5108 2.93424 10.0368 2.92076 9.7356 3.20504L5.2356 7.45211C5.08565 7.59365 5.00042 7.79085 5.00024 7.99704C5.00019 8.20338 5.08562 8.40121 5.2356 8.54293L9.7356 12.7949C10.0367 13.0792 10.5107 13.0656 10.7952 12.7646C11.0795 12.4635 11.0659 11.9895 10.7649 11.705L6.84302 7.99704L10.7649 4.29489C11.066 4.01054 11.0794 3.53648 10.7952 3.23532Z" />
		</svg>
	);
};
