import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SysCancel = ({
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
			<g clip-path="url(#clip0_1109_2353)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM9.71973 5.21973C10.0126 4.92708 10.4875 4.92691 10.7803 5.21973C11.0728 5.51256 11.0728 5.98744 10.7803 6.28027L9.06055 8L10.7803 9.71973C11.0728 10.0126 11.0728 10.4874 10.7803 10.7803C10.4875 11.0731 10.0126 11.0729 9.71973 10.7803L8 9.06055L6.28027 10.7803C5.98746 11.0731 5.51264 11.0729 5.21973 10.7803C4.92683 10.4874 4.92683 10.0126 5.21973 9.71973L6.93945 8L5.21973 6.28027C4.92683 5.98738 4.92683 5.51262 5.21973 5.21973C5.51264 4.92708 5.98746 4.92691 6.28027 5.21973L8 6.93945L9.71973 5.21973Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2353">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
