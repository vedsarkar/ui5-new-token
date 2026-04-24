import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Puzzle = ({
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
			<path d="M11.5 1C12.3284 1 13 1.67157 13 2.5V3H14.25C15.2165 3 16 3.7835 16 4.75V11.25C16 12.2165 15.2165 13 14.25 13H12V11.5C12 11.2239 11.7761 11 11.5 11C11.2239 11 11 11.2239 11 11.5V13H6V13.5C6 14.3284 5.32843 15 4.5 15C3.67157 15 3 14.3284 3 13.5V13H1.75C0.783502 13 0 12.2165 0 11.25V9H1C1.55228 9 2 8.55228 2 8C2 7.44772 1.55228 7 1 7H0V4.75C0 3.7835 0.783502 3 1.75 3H3.5V4C3.5 4.55228 3.94772 5 4.5 5C5.05228 5 5.5 4.55228 5.5 4V3H10V2.5C10 1.67157 10.6716 1 11.5 1ZM8.75 6H9.5C10.3284 6 11 6.67157 11 7.5C11 8.32843 10.3284 9 9.5 9H8.75V11.5H9.5C9.5 10.3954 10.3954 9.5 11.5 9.5C12.6046 9.5 13.5 10.3954 13.5 11.5H14.25C14.3881 11.5 14.5 11.3881 14.5 11.25V4.75C14.5 4.61193 14.3881 4.5 14.25 4.5H8.75V6Z" />
		</svg>
	);
};
