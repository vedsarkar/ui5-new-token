import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ProgramTriangles2 = ({
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
			<path d="M8.00002 4.99448C8.28405 4.99454 8.5439 5.15557 8.67093 5.40975L12.9209 13.9144C13.1654 14.4044 12.7973 14.9999 12.25 15H3.75001C3.20274 15 2.83466 14.4043 3.07912 13.9144L7.32912 5.40975C7.45618 5.15556 7.71597 4.99448 8.00002 4.99448ZM12.1709 2.40809L15.9209 9.91223C16.1653 10.4023 15.7973 10.9975 15.25 10.9978H13.1407L10.0127 4.73848C9.93746 4.60755 9.86208 4.48011 9.82132 4.42385L10.8291 2.40809C11.1004 1.86555 11.8997 1.86532 12.1709 2.40809ZM5.17092 0.406991L6.86623 3.80046C6.53945 3.9913 6.26132 4.26419 6.0635 4.59876L3.85939 8.99669H0.750008C0.20274 8.99669 -0.165335 8.40099 0.0791081 7.91113L3.82912 0.406991C4.10041 -0.135539 4.89967 -0.135788 5.17092 0.406991Z" />
		</svg>
	);
};
