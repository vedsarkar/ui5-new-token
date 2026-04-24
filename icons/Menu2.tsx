import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Menu2 = ({
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
			<path d="M15.25 12.5C15.664 12.5003 16 12.8359 16 13.25C16 13.6641 15.664 13.9997 15.25 14H0.75C0.335786 14 0 13.6642 0 13.25C0 12.8358 0.335786 12.5 0.75 12.5H15.25ZM15.25 7C15.664 7.00026 16 7.33595 16 7.75C16 8.16405 15.664 8.49974 15.25 8.5H0.75C0.335786 8.5 0 8.16421 0 7.75C0 7.33579 0.335786 7 0.75 7H15.25ZM15.25 2C15.664 2.00026 16 2.33595 16 2.75C16 3.16405 15.664 3.49974 15.25 3.5H0.75C0.335786 3.5 0 3.16421 0 2.75C0 2.33579 0.335786 2 0.75 2H15.25Z" />
		</svg>
	);
};
