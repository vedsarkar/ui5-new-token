import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Tree = ({
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
			<path d="M11.25 1C11.6642 1 12 1.33579 12 1.75V5.25C12 5.66421 11.6642 6 11.25 6H8.75V8H13C13.9665 8 14.75 8.7835 14.75 9.75V11H15.25C15.6642 11 16 11.3358 16 11.75V14.25C16 14.6642 15.6642 15 15.25 15H12.75C12.3358 15 12 14.6642 12 14.25V11.75C12 11.3358 12.3358 11 12.75 11H13.25V9.75C13.25 9.61193 13.1381 9.5 13 9.5H8.75V11H9.25C9.66421 11 10 11.3358 10 11.75V14.25C10 14.6642 9.66421 15 9.25 15H6.75C6.33579 15 6 14.6642 6 14.25V11.75C6 11.3358 6.33579 11 6.75 11H7.25V9.5H3C2.86193 9.5 2.75 9.61193 2.75 9.75V11H3.25C3.66421 11 4 11.3358 4 11.75V14.25C4 14.6642 3.66421 15 3.25 15H0.75C0.335786 15 0 14.6642 0 14.25V11.75C0 11.3358 0.335786 11 0.75 11H1.25V9.75C1.25 8.7835 2.0335 8 3 8H7.25V6H4.75C4.33579 6 4 5.66421 4 5.25V1.75C4 1.33579 4.33579 1 4.75 1H11.25ZM1.5 13.5H2.5V12.5H1.5V13.5ZM7.5 13.5H8.5V12.5H7.5V13.5ZM13.5 13.5H14.5V12.5H13.5V13.5ZM5.5 4.5H10.5V2.5H5.5V4.5Z" />
		</svg>
	);
};
