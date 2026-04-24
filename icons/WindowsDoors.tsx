import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const WindowsDoors = ({
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
			<path d="M6.25 2C6.66421 2 7 2.33579 7 2.75V13.25C7 13.6642 6.66421 14 6.25 14H0.75C0.335786 14 0 13.6642 0 13.25V2.75C0 2.33579 0.335786 2 0.75 2H6.25ZM1.5 12.5H5.5V3.5H1.5V12.5ZM15.25 2C15.6642 2 16 2.33579 16 2.75V8.75C16 9.16421 15.6642 9.5 15.25 9.5H9.25C8.83579 9.5 8.5 9.16421 8.5 8.75V2.75C8.5 2.33579 8.83579 2 9.25 2H15.25ZM4.25 7C4.80228 7 5.25 7.44772 5.25 8C5.25 8.55228 4.80228 9 4.25 9C3.69772 9 3.25 8.55228 3.25 8C3.25 7.44772 3.69772 7 4.25 7ZM10 8H11.5V6.5H10V8ZM13 8H14.5V6.5H13V8ZM10 5H11.5V3.5H10V5ZM13 5H14.5V3.5H13V5Z" />
		</svg>
	);
};
