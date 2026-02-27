import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ArrowDownward = ({
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
			<path d="M9.25 2.5V14.627L3.55375 8.93075L2.5 10L10 17.5L17.5 10L16.4462 8.93075L10.75 14.627V2.5H9.25Z" />
		</svg>
	);
};
