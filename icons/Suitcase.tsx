import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Suitcase = ({
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
			<path d="M10.249 1C11.2155 1 11.999 1.7835 11.999 2.75V4H13.25C14.7688 4 16 5.23122 16 6.75V12.25C16 13.7688 14.7688 15 13.25 15H2.75C1.23122 15 8.0532e-09 13.7688 0 12.25V6.75C0 5.23122 1.23122 4 2.75 4H3.99902V2.75C3.99902 1.7835 4.78253 1 5.74902 1H10.249ZM2.75 5.5C2.05964 5.5 1.5 6.05964 1.5 6.75V12.25C1.5 12.9404 2.05964 13.5 2.75 13.5H4V5.5H2.75ZM11.999 13.5H13.25C13.9404 13.5 14.5 12.9404 14.5 12.25V6.75C14.5 6.05964 13.9404 5.5 13.25 5.5H11.999V13.5ZM5.5 13.5H10.499V5.5H5.5V13.5ZM5.74902 2.5C5.61095 2.5 5.49902 2.61193 5.49902 2.75V4H10.499V2.75C10.499 2.61193 10.3871 2.5 10.249 2.5H5.74902Z" />
		</svg>
	);
};
