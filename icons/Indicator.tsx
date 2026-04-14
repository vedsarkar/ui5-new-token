import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Indicator = ({
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
			<path d="M10 14.5C11.2487 14.5 12.3108 14.0622 13.1865 13.1865C14.0622 12.3108 14.5 11.2487 14.5 10C14.5 8.75133 14.0622 7.68917 13.1865 6.8135C12.3108 5.93783 11.2487 5.5 10 5.5C8.75133 5.5 7.68917 5.93783 6.8135 6.8135C5.93783 7.68917 5.5 8.75133 5.5 10C5.5 11.2487 5.93783 12.3108 6.8135 13.1865C7.68917 14.0622 8.75133 14.5 10 14.5Z" />
		</svg>
	);
};
