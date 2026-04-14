import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Move = ({
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
			<path d="M9.99994 19.6538L6.09619 15.75L7.16544 14.6808L9.24994 16.7655V12.25H10.7499V16.75L12.8192 14.6655L13.9037 15.75L9.99994 19.6538ZM4.24994 13.9038L0.346191 10L4.23444 6.1115L5.30369 7.18075L3.23444 9.25H7.74994V10.75H3.24994L5.33444 12.8193L4.24994 13.9038ZM15.7499 13.9038L14.6807 12.8345L16.7654 10.75H12.2499V9.25H16.7499L14.6654 7.18075L15.7499 6.09625L19.6537 10L15.7499 13.9038ZM9.24994 7.75V3.2345L7.16544 5.31925L6.09619 4.25L9.99994 0.346252L13.9037 4.25L12.8344 5.31925L10.7499 3.2345V7.75H9.24994Z" />
		</svg>
	);
};
