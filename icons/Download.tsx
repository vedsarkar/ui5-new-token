import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Download = ({
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
			<g clip-path="url(#clip0_1095_2367)">
				<path d="M15.25 14.5C15.6642 14.5 16 14.8358 16 15.25C16 15.6642 15.6642 16 15.25 16H0.75C0.335786 16 0 15.6642 0 15.25C0 14.8358 0.335786 14.5 0.75 14.5H15.25ZM8 0C8.41421 0 8.75 0.335786 8.75 0.75V9.3418L10.7002 7.24023C10.9819 6.93668 11.4561 6.91866 11.7598 7.2002C12.0633 7.48187 12.0813 7.95613 11.7998 8.25977L8.55176 11.7598C8.25946 12.0748 7.74596 12.0756 7.45312 11.7607L4.2002 8.26074C3.91831 7.9573 3.93585 7.48213 4.23926 7.2002C4.5427 6.91831 5.01787 6.93585 5.2998 7.23926L7.25 9.33691V0.75C7.25 0.335786 7.58579 0 8 0Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2367">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
