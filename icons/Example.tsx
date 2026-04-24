import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Example = ({
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
			<g clip-path="url(#clip0_1095_2396)">
				<path d="M8 10C9.68927 10 11 11.3109 11 13C11 14.6891 9.68927 16 8 16C6.31073 16 5 14.6891 5 13C5 11.3109 6.31073 10 8 10ZM8 11.5C7.1392 11.5 6.5 12.1393 6.5 13C6.5 13.8607 7.1392 14.5 8 14.5C8.8608 14.5 9.5 13.8607 9.5 13C9.5 12.1393 8.8608 11.5 8 11.5ZM3 5C4.68927 5 6 6.31088 6 8C6 9.68912 4.68927 11 3 11C1.31073 11 0 9.68912 0 8C1.00916e-08 6.31088 1.31073 5 3 5ZM13 5C14.6893 5 16 6.31088 16 8C16 9.68912 14.6893 11 13 11C11.3107 11 10 9.68912 10 8C10 6.31088 11.3107 5 13 5ZM3 6.5C2.1392 6.5 1.5 7.13926 1.5 8C1.5 8.86074 2.1392 9.5 3 9.5C3.8608 9.5 4.5 8.86074 4.5 8C4.5 7.13926 3.8608 6.5 3 6.5ZM13 6.5C12.1392 6.5 11.5 7.13926 11.5 8C11.5 8.86074 12.1392 9.5 13 9.5C13.8608 9.5 14.5 8.86074 14.5 8C14.5 7.13926 13.8608 6.5 13 6.5ZM8 0C9.65 0 11 1.35 11 3C11 4.65 9.65 6 8 6C6.35 6 5 4.65 5 3C5 1.35 6.35 1.41869e-08 8 0Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2396">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
