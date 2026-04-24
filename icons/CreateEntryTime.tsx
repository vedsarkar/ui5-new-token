import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CreateEntryTime = ({
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
			<g clip-path="url(#clip0_1095_2319)">
				<path d="M7.5 1C7.91421 1 8.25 1.33579 8.25 1.75C8.25 2.16421 7.91421 2.5 7.5 2.5C4.16645 2.5 1.5 5.16645 1.5 8.5C1.5 11.8335 4.16645 14.5 7.5 14.5C10.8335 14.5 13.5 11.8335 13.5 8.5C13.5 8.08579 13.8358 7.75 14.25 7.75C14.6642 7.75 15 8.08579 15 8.5C15 12.662 11.662 16 7.5 16C3.33803 16 0 12.662 0 8.5C0 4.33803 3.33803 1 7.5 1ZM7.25 4C7.66421 4 8 4.33579 8 4.75V8.57617L9.64941 9.61523C9.99976 9.83595 10.1053 10.299 9.88477 10.6494C9.66405 10.9998 9.20101 11.1053 8.85059 10.8848L6.85059 9.625C6.63267 9.48771 6.50008 9.24778 6.5 8.99023V4.75C6.5 4.33579 6.83579 4 7.25 4ZM12.5 0C12.9142 -3.883e-10 13.25 0.335786 13.25 0.75V2.75H15.25C15.6445 2.75 16 3.07562 16 3.5C16 3.92438 15.6523 4.25 15.25 4.25H13.25V6.25C13.25 6.66421 12.9142 7 12.5 7C12.0858 7 11.75 6.66421 11.75 6.25V4.25H9.75C9.33579 4.25 9 3.91421 9 3.5C9 3.08579 9.33579 2.75 9.75 2.75H11.75V0.75C11.75 0.335786 12.0858 1.81059e-08 12.5 0Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2319">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
