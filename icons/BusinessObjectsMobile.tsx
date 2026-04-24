import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const BusinessObjectsMobile = ({
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
			<g clip-path="url(#clip0_1057_2468)">
				<path d="M6.25 0C6.66421 1.6027e-07 7 0.335787 7 0.75V15.25C7 15.6642 6.66421 16 6.25 16H0.75C0.335787 16 2.93389e-07 15.6642 0 15.25V0.75C0 0.335786 0.335786 0 0.75 0H6.25ZM12.5 9C14.4725 9 16 10.5275 16 12.5C16 14.4725 14.4726 16 12.5 16C10.5275 16 9 14.4725 9 12.5C9 10.5275 10.5275 9 12.5 9ZM1.5 14.5H5.5V1.5H1.5V14.5ZM12.5 10.5C11.3559 10.5 10.5 11.3559 10.5 12.5C10.5 13.6441 11.3559 14.5 12.5 14.5C13.6442 14.5 14.5 13.6441 14.5 12.5C14.5 11.3559 13.6441 10.5 12.5 10.5ZM15.25 0C15.6642 0 16 0.335786 16 0.75V6.25C16 6.66421 15.6642 7 15.25 7H9.75C9.33579 7 9 6.66421 9 6.25V0.75C9 0.335786 9.33579 0 9.75 0H15.25ZM10.5 5.5H14.5V1.5H10.5V5.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1057_2468">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
