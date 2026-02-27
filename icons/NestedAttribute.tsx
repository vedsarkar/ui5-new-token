import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const NestedAttribute = ({
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
			viewBox="0 0 20 20"
			fill="currentColor"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.5 4C3.94772 4 3.5 4.44772 3.5 5V8C3.5 8.55228 3.94772 9 4.5 9H5.75L5.75 14.25H10.5V15C10.5 15.5523 10.9477 16 11.5 16H15.5C16.0523 16 16.5 15.5523 16.5 15V12C16.5 11.4477 16.0523 11 15.5 11H11.5C10.9477 11 10.5 11.4477 10.5 12V12.75H7.25L7.25 9H8.5C9.05228 9 9.5 8.55228 9.5 8V5C9.5 4.44772 9.05228 4 8.5 4H4.5ZM5 5.5V7.5H8V5.5H5ZM12 12.5V14.5H15V12.5H12Z"
			/>
		</svg>
	);
};
