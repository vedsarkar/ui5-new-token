import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Unlocked = ({
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
			<g clip-path="url(#clip0_1096_2359)">
				<path d="M12 0C14.1882 1.51842e-07 16 1.7604 16 3.93555V4.25C16 4.66421 15.6642 5 15.25 5C14.8358 5 14.5 4.66421 14.5 4.25V3.93555C14.5 2.61569 13.3868 1.5 12 1.5C10.6116 1.5 9.5 2.60722 9.5 3.93555V7H10.25C11.2165 7 12 7.7835 12 8.75V14.25C12 15.2165 11.2165 16 10.25 16H1.75C0.783502 16 2.81862e-08 15.2165 0 14.25V8.75C0 7.7835 0.783502 7 1.75 7H8V3.93555C8 1.7489 9.81339 0 12 0ZM1.75 8.5C1.61193 8.5 1.5 8.61193 1.5 8.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H10.25C10.3881 14.5 10.5 14.3881 10.5 14.25V8.75C10.5 8.61193 10.3881 8.5 10.25 8.5H1.75ZM6 10C6.82843 10 7.5 10.6716 7.5 11.5C7.5 12.3284 6.82843 13 6 13C5.17157 13 4.5 12.3284 4.5 11.5C4.5 10.6716 5.17157 10 6 10Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2359">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
