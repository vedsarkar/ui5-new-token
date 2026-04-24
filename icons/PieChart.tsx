import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const PieChart = ({
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
			<g clip-path="url(#clip0_1109_2497)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8.5 8.62402V14.4785C11.8561 14.2231 14.5 11.4215 14.5 8C14.5 7.54379 14.4527 7.09862 14.3633 6.66895L8.5 8.62402ZM7 1.57617C3.88489 2.05716 1.5 4.7502 1.5 8C1.5 11.2497 3.88496 13.9418 7 14.4229V1.57617ZM8.5 7.04199L13.8877 5.24609C12.9179 3.17624 10.8903 1.70239 8.5 1.52051V7.04199Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2497">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
