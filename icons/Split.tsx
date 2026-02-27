import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Split = ({
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
			<path d="M9.25 17.5V10.3038L4 5.05375V8H2.5V2.5H8V4H5.05375L10.75 9.69625V17.5H9.25ZM12.5038 8.58075L11.4193 7.49625L14.9462 4H12V2.5H17.5V8H16V5.05375L12.5038 8.58075Z" />
		</svg>
	);
};
