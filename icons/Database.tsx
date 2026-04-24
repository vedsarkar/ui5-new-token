import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Database = ({
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
			<g clip-path="url(#clip0_1095_2340)">
				<path d="M10.5 14.6855L8.37207 15.9013C8.14156 16.0329 7.85844 16.0329 7.62793 15.9013L5.5 14.6855V10.9579L7.37988 12.0321C7.76405 12.2516 8.23595 12.2516 8.62012 12.0321L10.5 10.9579V14.6855ZM4 10.3485V14.1513L1 12.1513V8.34855L4 10.3485ZM15 12.1513L12 14.1513V10.3485L15 8.34855V12.1513ZM10.5 6.81437V9.18546L8 10.6142L5.5 9.18546V6.81437L8 5.38565L10.5 6.81437ZM6.71094 4.22061L4.58789 5.54874C4.22245 5.77715 4.00003 6.17737 4 6.60831V8.21378L1 6.71378V4.24991C1 3.98077 1.14426 3.73208 1.37793 3.59854L3.5 2.38565L6.71094 4.22061ZM14.6221 3.59854C14.8557 3.73208 15 3.98077 15 4.24991V6.71378L12 8.21378V6.60831C12 6.17737 11.7776 5.77715 11.4121 5.54874L9.28906 4.22061L12.5 2.38565L14.6221 3.59854ZM7.7168 0.0555728C7.92853 -0.03082 8.17038 -0.0166676 8.37207 0.0985416L11.2617 1.74991L8 3.61417L4.73828 1.74991L7.7168 0.0555728Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2340">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
