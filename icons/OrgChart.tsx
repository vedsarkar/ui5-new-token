import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const OrgChart = ({
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
			<g clip-path="url(#clip0_1109_2530)">
				<path d="M11.75 0C12.1642 0 12.5 0.335786 12.5 0.75V4.25C12.5 4.66421 12.1642 5 11.75 5H8.75V7.25H12.75C13.1642 7.25 13.5 7.58579 13.5 8V11H15.25C15.6642 11 16 11.3358 16 11.75V15.25C16 15.6642 15.6642 16 15.25 16H9.75C9.33579 16 9 15.6642 9 15.25V11.75C9 11.3358 9.33579 11 9.75 11H12V8.75H4V11H6.25C6.66421 11 7 11.3358 7 11.75V15.25C7 15.6642 6.66421 16 6.25 16H0.75C0.335786 16 0 15.6642 0 15.25V11.75C0 11.3358 0.335786 11 0.75 11H2.5V8C2.5 7.58579 2.83579 7.25 3.25 7.25H7.25V5H4.25C3.83579 5 3.5 4.66421 3.5 4.25V0.75C3.5 0.335786 3.83579 0 4.25 0H11.75ZM1.5 14.5H5.5V12.5H1.5V14.5ZM10.5 14.5H14.5V12.5H10.5V14.5ZM5 3.5H11V1.5H5V3.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2530">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
