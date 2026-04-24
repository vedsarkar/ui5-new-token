import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FilterFields = ({
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
			<path d="M14.25 11.5C14.6642 11.5 15 11.8358 15 12.25V14.75C15 15.1642 14.6642 15.5 14.25 15.5H1.75C1.33579 15.5 1 15.1642 1 14.75V12.25C1 11.8358 1.33579 11.5 1.75 11.5H14.25ZM2.5 14H13.5V13H2.5V14ZM6.25 9C6.66421 9 7 9.33579 7 9.75C7 10.1642 6.66421 10.5 6.25 10.5H1.75C1.33579 10.5 1 10.1642 1 9.75C1 9.33579 1.33579 9 1.75 9H6.25ZM14.25 3.5C14.6642 3.5 15 3.83579 15 4.25V6.75C15 7.16421 14.6642 7.5 14.25 7.5H1.75C1.33579 7.5 1 7.16421 1 6.75V4.25C1 3.83579 1.33579 3.5 1.75 3.5H14.25ZM2.5 6H13.5V5H2.5V6ZM6.25 1C6.66421 1 7 1.33579 7 1.75C7 2.16421 6.66421 2.5 6.25 2.5H1.75C1.33579 2.5 1 2.16421 1 1.75C1 1.33579 1.33579 1 1.75 1H6.25Z" />
		</svg>
	);
};
