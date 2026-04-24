import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const TrendDown = ({
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
			<g clip-path="url(#clip0_1096_2368)">
				<path d="M0.193448 3.24812C0.4705 2.94036 0.945155 2.91555 1.25302 3.19246L5.68176 7.17785C5.68176 7.17785 8.10046 4.33255 8.23841 4.20321C8.54517 3.91559 9.04435 3.94189 9.31947 4.26083L14.5011 10.2706V8.75013C14.5012 8.33604 14.8371 8.00021 15.2511 8.00012C15.6653 8.00012 16.0011 8.33599 16.0011 8.75013V12.2502C16.0011 12.6644 15.6654 13.0002 15.2511 13.0002H11.7511C11.337 13.0001 11.0011 12.6643 11.0011 12.2502C11.0012 11.8361 11.337 11.5002 11.7511 11.5002H13.5802L8.75208 5.90049L6.32043 8.73841C6.05751 9.04497 5.54932 9.07791 5.24914 8.80774L0.249112 4.3077C-0.0585557 4.03058 -0.0835788 3.55593 0.193448 3.24812Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2368">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
