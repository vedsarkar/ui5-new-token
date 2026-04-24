import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Heading2 = ({
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
			<path d="M7.25 2C7.66421 2 8 2.33579 8 2.75V13.25C8 13.6642 7.66421 14 7.25 14C6.83579 14 6.5 13.6642 6.5 13.25V9H1.5V13.25C1.5 13.6642 1.16421 14 0.75 14C0.335786 14 0 13.6642 0 13.25V2.75C0 2.33579 0.335786 2 0.75 2C1.16421 2 1.5 2.33579 1.5 2.75V7.5H6.5V2.75C6.5 2.33579 6.83579 2 7.25 2ZM14.25 4C15.2165 4 16 4.7835 16 5.75V7.75C16 8.7165 15.2165 9.5 14.25 9.5H11.75C11.6119 9.5 11.5 9.61193 11.5 9.75V12.5H15.25C15.6642 12.5 16 12.8358 16 13.25C16 13.6642 15.6642 14 15.25 14H10.75C10.3358 14 10 13.6642 10 13.25V9.75C10 8.7835 10.7835 8 11.75 8H14.25C14.3881 8 14.5 7.88807 14.5 7.75V5.75C14.5 5.61193 14.3881 5.5 14.25 5.5H10.75C10.3358 5.5 10 5.16421 10 4.75C10 4.33579 10.3358 4 10.75 4H14.25Z" />
		</svg>
	);
};
