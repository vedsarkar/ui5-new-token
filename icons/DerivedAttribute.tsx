import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const DerivedAttribute = ({
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
			<path d="M16 11V15C16 15.5523 15.5523 16 15 16H11V14.5H14.5V11H16ZM12 7.5C12.5523 7.5 13 7.94772 13 8.5V11.5C13 12.0523 12.5523 12.5 12 12.5H8C7.44772 12.5 7 12.0523 7 11.5V8.5C7 7.94772 7.44772 7.5 8 7.5H12ZM8.5 11H11.5V9H8.5V11ZM9 5.5H5.5V9H4V5C4 4.44772 4.44772 4 5 4H9V5.5Z" />
		</svg>
	);
};
