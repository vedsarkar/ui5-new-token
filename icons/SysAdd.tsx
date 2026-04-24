import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SysAdd = ({
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
			<g clip-path="url(#clip0_1109_2356)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM8 4.5C8.41421 4.5 8.75 4.83579 8.75 5.25V7.25H10.75L10.8271 7.25391C11.2051 7.29253 11.5 7.61183 11.5 8C11.5 8.38817 11.2051 8.70747 10.8271 8.74609L10.75 8.75H8.75V10.75C8.75 11.1642 8.41421 11.5 8 11.5C7.58579 11.5 7.25 11.1642 7.25 10.75V8.75H5.25C4.83579 8.75 4.5 8.41421 4.5 8C4.5 7.58579 4.83579 7.25 5.25 7.25H7.25V5.25C7.25 4.83579 7.58579 4.5 8 4.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2356">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
