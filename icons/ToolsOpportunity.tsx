import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ToolsOpportunity = ({
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
			<g clip-path="url(#clip0_1096_2376)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.5C4.57843 1.5 1.77588 4.14383 1.52051 7.5H3.32715C4.31442 7.5 5.24847 7.05119 5.86523 6.28027L7.28906 4.5H5.75C5.33579 4.5 5 4.16421 5 3.75C5 3.33579 5.33579 3 5.75 3H9.25C9.66421 3 10 3.33579 10 3.75V7.25C10 7.66421 9.66421 8 9.25 8C8.83579 8 8.5 7.66421 8.5 7.25V5.38867L7.03711 7.21777C6.13569 8.34451 4.7701 9 3.32715 9H1.57715C1.98174 11.62 3.95082 13.7208 6.5 14.3232V12.75C6.5 12.3358 6.83579 12 7.25 12C7.66421 12 8 12.3358 8 12.75V14.5C8.3401 14.5 8.674 14.4732 9 14.4229V10.75C9 10.3358 9.33579 10 9.75 10C10.1642 10 10.5 10.3358 10.5 10.75V14.001C10.8504 13.8549 11.1839 13.6771 11.5 13.4746V7.75C11.5 7.33579 11.8358 7 12.25 7C12.6642 7 13 7.33579 13 7.75V12.1523C13.9363 11.0261 14.5 9.57907 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2376">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
