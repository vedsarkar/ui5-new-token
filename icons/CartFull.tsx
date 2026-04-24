import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CartFull = ({
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
			<g clip-path="url(#clip0_1057_2582)">
				<path d="M4.50526 13C5.33466 13 6.00702 13.6716 6.00702 14.5C6.00702 15.3284 5.33466 16 4.50526 16C3.67587 16 3.00351 15.3284 3.00351 14.5C3.00351 13.6716 3.67587 13 4.50526 13ZM12.5146 13C13.344 13 14.0164 13.6716 14.0164 14.5C14.0164 15.3284 13.344 16 12.5146 16C11.6852 16 11.0129 15.3284 11.0129 14.5C11.0129 13.6716 11.6852 13 12.5146 13ZM2.50292 0C2.79879 0 3.06727 0.173692 3.1883 0.443359L3.88735 2H14.2452C15.6348 2 16.4712 3.53887 15.7147 4.70312L13.1443 8.6582C13.0058 8.87128 12.7689 9 12.5146 9H5.82028L5.01171 10.5H13.2655C13.6802 10.5 14.0164 10.8358 14.0164 11.25C14.0164 11.6642 13.6802 12 13.2655 12H3.75439C3.19667 12 2.82907 11.385 3.09346 10.8945L4.76044 7.80078L2.01701 1.5H0.750877C0.336179 1.5 0 1.16421 0 0.75C0 0.335786 0.336179 0 0.750877 0H2.50292Z" />
			</g>
			<defs>
				<clipPath id="clip0_1057_2582">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
