import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const EndDateFlag = ({
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
			<path d="M3.5 18.75V2.5H11.596L11.996 4.5H17.5V13.5H11.404L11.004 11.5H5V18.75H3.5ZM12.65 12H16V6H10.75L10.35 4H5V10H12.25L12.65 12Z" />
		</svg>
	);
};
