import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const OpenCommandField = ({
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
			<path d="M2.20664 3.23532C2.49098 2.93424 2.96504 2.92076 3.26621 3.20505L7.76621 7.4522C8.07522 7.74434 8.07536 8.25089 7.76621 8.54304L3.26621 12.7951C2.96527 13.0793 2.49112 13.0654 2.20664 12.7648C1.92229 12.4637 1.93589 11.9897 2.23691 11.7052L6.15878 7.99713L2.23691 4.29491C1.93584 4.01057 1.92237 3.5365 2.20664 3.23532ZM8.20664 3.23532C8.49098 2.93424 8.96504 2.92076 9.26621 3.20505L13.7662 7.4522C14.0752 7.74434 14.0754 8.25089 13.7662 8.54304L9.26621 12.7951C8.96527 13.0793 8.49112 13.0654 8.20664 12.7648C7.92229 12.4637 7.93589 11.9897 8.23691 11.7052L12.1588 7.99713L8.23691 4.29491C7.93584 4.01057 7.92237 3.5365 8.20664 3.23532Z" />
		</svg>
	);
};
