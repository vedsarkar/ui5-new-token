import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Bed = ({
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
			<path d="M0.75 3C1.16421 3 1.5 3.33579 1.5 3.75V9H7V4.75C7 4.33579 7.33579 4 7.75 4L12.4434 4.00488C14.4246 4.10551 16 5.74378 16 7.75V12.25C16 12.6642 15.6642 13 15.25 13C14.8358 13 14.5 12.6642 14.5 12.25V10.5H1.5V12.25C1.5 12.6642 1.16421 13 0.75 13C0.335786 13 0 12.6642 0 12.25V3.75C0 3.33579 0.335786 3 0.75 3ZM8.5 9H14.5V7.75C14.5 6.58517 13.6148 5.62714 12.4805 5.51172L8.5 5.5V9ZM3.5 5C4.32843 5 5 5.67157 5 6.5C5 7.32843 4.32843 8 3.5 8C2.67157 8 2 7.32843 2 6.5C2 5.67157 2.67157 5 3.5 5Z" />
		</svg>
	);
};
