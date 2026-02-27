import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MenuCopy = ({
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
			<path d="M1.5 15.6345V14.1348H18.5V15.6345H1.5ZM1.5 10.75V9.25001H18.5V10.75H1.5ZM1.5 5.86526V4.36551H18.5V5.86526H1.5Z" />
		</svg>
	);
};
