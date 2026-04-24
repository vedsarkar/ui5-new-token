import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const TextAlignJustified = ({
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
			<path d="M14.25 13.5C14.6642 13.5 15 13.8358 15 14.25C15 14.6642 14.6642 15 14.25 15H1.75C1.33579 15 1 14.6642 1 14.25C1 13.8358 1.33579 13.5 1.75 13.5H14.25ZM14.25 9.5C14.6642 9.5 15 9.83579 15 10.25C15 10.6642 14.6642 11 14.25 11H1.75C1.33579 11 1 10.6642 1 10.25C1 9.83579 1.33579 9.5 1.75 9.5H14.25ZM14.25 5C14.6642 5 15 5.33579 15 5.75C15 6.16421 14.6642 6.5 14.25 6.5H1.75C1.33579 6.5 1 6.16421 1 5.75C1 5.33579 1.33579 5 1.75 5H14.25ZM14.25 1C14.6642 1 15 1.33579 15 1.75C15 2.16421 14.6642 2.5 14.25 2.5H1.75C1.33579 2.5 1 2.16421 1 1.75C1 1.33579 1.33579 1 1.75 1H14.25Z" />
		</svg>
	);
};
