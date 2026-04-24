import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Duplicate = ({
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
			<path d="M12.25 3C13.7688 3 15 4.23122 15 5.75V13.25C15 14.7688 13.7688 16 12.25 16H6.75C5.23122 16 4 14.7688 4 13.25V5.75C4 4.23122 5.23122 3 6.75 3H12.25ZM6.75 4.5C6.05964 4.5 5.5 5.05964 5.5 5.75V13.25C5.5 13.9404 6.05964 14.5 6.75 14.5H12.25C12.9404 14.5 13.5 13.9404 13.5 13.25V5.75C13.5 5.05964 12.9404 4.5 12.25 4.5H6.75ZM11.25 0C11.6642 0 12 0.335786 12 0.75C12 1.16421 11.6642 1.5 11.25 1.5H3.75C3.05964 1.5 2.5 2.05964 2.5 2.75V11.25C2.5 11.6642 2.16421 12 1.75 12C1.33579 12 1 11.6642 1 11.25V2.75C1 1.23122 2.23122 0 3.75 0H11.25Z" />
		</svg>
	);
};
