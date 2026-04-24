import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SortDescending = ({
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
			<path d="M11.25 11C11.6642 11 12 11.3358 12 11.75C12 12.1642 11.6642 12.5 11.25 12.5H4.75C4.33579 12.5 4 12.1642 4 11.75C4 11.3358 4.33579 11 4.75 11H11.25ZM13.25 7C13.6642 7 14 7.33579 14 7.75C14 8.16421 13.6642 8.5 13.25 8.5H2.75C2.33579 8.5 2 8.16421 2 7.75C2 7.33579 2.33579 7 2.75 7H13.25ZM15.25 3.5C15.6642 3.5 16 3.83579 16 4.25C16 4.66421 15.6642 5 15.25 5H0.75C0.335786 5 0 4.66421 0 4.25C0 3.83579 0.335786 3.5 0.75 3.5H15.25Z" />
		</svg>
	);
};
