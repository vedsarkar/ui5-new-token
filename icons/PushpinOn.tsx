import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const PushpinOn = ({
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
			<path d="M9.96275 1.05651C10.2429 0.940582 10.5657 1.00526 10.7801 1.2196L14.7802 5.21962C14.9946 5.43403 15.0591 5.75684 14.9433 6.03701C14.8272 6.31725 14.5532 6.49988 14.2499 6.4999H13.285L11.4276 8.1503L10.2313 13.416C10.1029 13.9809 9.37927 14.1899 8.96957 13.7802L6.12481 10.9355L2.28004 14.7802C1.98715 15.0731 1.51238 15.0731 1.21948 14.7802C0.926719 14.4873 0.926632 14.0125 1.21948 13.7197L5.06426 9.87492L2.2195 7.03018C1.80996 6.62044 2.01874 5.89686 2.58376 5.76845L7.84847 4.57118L9.49985 2.71472V1.74987C9.49998 1.44665 9.68258 1.17256 9.96275 1.05651Z" />
		</svg>
	);
};
