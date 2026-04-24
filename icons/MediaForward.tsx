import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MediaForward = ({
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
			<path d="M1.22388 2.16257L7.72388 7.41656C7.89983 7.55905 8.0022 7.77346 8.0022 8.00001C8.00215 8.22653 7.89983 8.44099 7.72388 8.58346L1.22388 13.8374C0.743011 14.226 0.00232181 13.8729 0.00219727 13.254V2.74602C0.00219727 2.12706 0.743097 1.77395 1.22388 2.16257ZM9.22388 2.16257L15.7239 7.41656C16.0891 7.71235 16.0892 8.28767 15.7239 8.58346L9.22388 13.8374C8.74301 14.226 8.00232 13.8729 8.0022 13.254V8.00001V2.74602C8.0022 2.12706 8.7431 1.77395 9.22388 2.16257ZM1.5022 11.6825L6.0022 8.00001L1.5022 4.31655V11.6825ZM9.5022 11.6825L14.0579 8.00001L9.5022 4.31655V11.6825Z" />
		</svg>
	);
};
