import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Delete = ({
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
			<path d="M10.25 0C11.2165 0 12 0.783502 12 1.75V3.5H14.25C14.6642 3.5 15 3.83579 15 4.25C15 4.66421 14.6642 5 14.25 5H13.5V14.25C13.5 15.2165 12.7165 16 11.75 16H4.25C3.34383 16 2.5983 15.3113 2.50879 14.4287L2.5 5H1.75C1.33579 5 1 4.66421 1 4.25C1 3.83579 1.33579 3.5 1.75 3.5H4V1.75C4 0.783502 4.7835 2.0133e-08 5.75 0H10.25ZM4.00488 14.3008C4.02833 14.4145 4.12931 14.5 4.25 14.5H11.75C11.8881 14.5 12 14.3881 12 14.25V5H4L4.00488 14.3008ZM6.25 7C6.66421 7 7 7.33579 7 7.75V12.25C7 12.6642 6.66421 13 6.25 13C5.83579 13 5.5 12.6642 5.5 12.25V7.75C5.5 7.33579 5.83579 7 6.25 7ZM9.75 7C10.1642 7 10.5 7.33579 10.5 7.75V12.25C10.5 12.6642 10.1642 13 9.75 13C9.33579 13 9 12.6642 9 12.25V7.75C9 7.33579 9.33579 7 9.75 7ZM5.75 1.5C5.61193 1.5 5.5 1.61193 5.5 1.75V3.5H10.5V1.75C10.5 1.61193 10.3881 1.5 10.25 1.5H5.75Z" />
		</svg>
	);
};
