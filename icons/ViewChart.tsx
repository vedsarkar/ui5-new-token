import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ViewChart = ({
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
			<path d="M1.5 18.5H6V17H3V14H1.5V18.5Z" />
			<path d="M17 6H18.5V1.5H14V3H17V6Z" />
			<path d="M6.86523 14.75H5.36548V8.25H6.86523V14.75Z" />
			<path d="M10.75 14.75H9.24998V5.25H10.75V14.75Z" />
			<path d="M14.6345 14.75H13.1347V11.25H14.6345V14.75Z" />
		</svg>
	);
};
