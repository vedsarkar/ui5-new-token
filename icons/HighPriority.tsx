import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const HighPriority = ({
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
			<g clip-path="url(#clip0_153681_471)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.55229 13 9 12.5523 9 12C9 11.4477 8.55229 11 8 11ZM8 3C7.44772 3 7 3.44772 7 4V9C7 9.55228 7.44772 10 8 10C8.55228 10 9 9.55228 9 9V4C9 3.44772 8.55229 3 8 3Z" />
			</g>
			<defs>
				<clipPath id="clip0_153681_471">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
