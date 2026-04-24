import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const InProgress2 = ({
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
			<path d="M12.25 1C13.7688 1 15 2.23122 15 3.75V12.25C15 13.7688 13.7688 15 12.25 15H3.75C2.23122 15 1 13.7688 1 12.25V3.75C1 2.23122 2.23122 1 3.75 1H12.25ZM8 3.75C7.44772 3.75 7 4.19772 7 4.75V8.27246C7.00013 8.75582 7.23313 9.20958 7.62598 9.49121L10.167 11.3125C10.6157 11.6342 11.2407 11.5315 11.5625 11.083C11.8842 10.6343 11.7815 10.0093 11.333 9.6875L9 8.01465V4.75C9 4.19772 8.55228 3.75 8 3.75Z" />
		</svg>
	);
};
