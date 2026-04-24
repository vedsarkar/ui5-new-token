import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ColorFill = ({
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
			<path d="M12.2 15H3.80001C2.26001 15 1.00001 13.74 1.00001 12.2V3.8C1.00001 2.26 2.26001 1 3.80001 1H12.2C13.74 1 15 2.26 15 3.8V12.2C15 13.74 13.74 15 12.2 15Z" />
		</svg>
	);
};
