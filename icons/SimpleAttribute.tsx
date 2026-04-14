import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SimpleAttribute = ({
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
			aria-hidden="true"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8.5 9V11H11.5V9H8.5ZM8 7.5C7.44772 7.5 7 7.94772 7 8.5V11.5C7 12.0523 7.44772 12.5 8 12.5H12C12.5523 12.5 13 12.0523 13 11.5V8.5C13 7.94772 12.5523 7.5 12 7.5H8Z"
			/>
		</svg>
	);
};
