import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SmartWatch = ({
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
			<path d="M9.7542 0C10.445 0 11.005 0.559644 11.005 1.25V3H11.2551C12.2222 3 13.0062 3.7835 13.0062 4.75V5.00391C13.62 5.00415 14 5.33594 14 5.85352V7.15332C13.9999 7.62251 13.6193 8.00268 13.1499 8.00293H13.0062V11.25C13.0062 12.2165 12.2222 13 11.2551 13H11.005V14.75C11.005 15.4404 10.445 16 9.7542 16H6.25202C5.56124 16 5.00124 15.4404 5.00124 14.75V13H4.75109C3.78399 13 3 12.2165 3 11.25V4.75C3 3.7835 3.78399 3 4.75109 3H5.00124V1.25C5.00124 0.559644 5.56124 2.0133e-09 6.25202 0H9.7542ZM4.75109 4.5C4.61293 4.5 4.50093 4.61193 4.50093 4.75V11.25C4.50093 11.3881 4.61293 11.5 4.75109 11.5H11.2551C11.3933 11.5 11.5053 11.3881 11.5053 11.25V4.75C11.5053 4.61193 11.3933 4.5 11.2551 4.5H4.75109Z" />
		</svg>
	);
};
