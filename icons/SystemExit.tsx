import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SystemExit = ({
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
			<g clip-path="url(#clip0_1096_2409)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM8 8C8.21259 8 8.41539 8.09004 8.55762 8.24805L10.8076 10.748C11.0847 11.0559 11.0597 11.5305 10.752 11.8076C10.4441 12.0847 9.96947 12.0598 9.69238 11.752L8 9.87109L6.30762 11.752C6.03053 12.0598 5.55593 12.0847 5.24805 11.8076C4.94027 11.5305 4.91533 11.0559 5.19238 10.748L7.44238 8.24805C7.58461 8.09004 7.78741 8 8 8ZM8 4C8.21259 4 8.41539 4.09004 8.55762 4.24805L10.8076 6.74805C11.0847 7.0559 11.0597 7.53051 10.752 7.80762C10.4441 8.0847 9.96947 8.05983 9.69238 7.75195L8 5.87109L6.30762 7.75195C6.03053 8.05983 5.55593 8.0847 5.24805 7.80762C4.94027 7.53051 4.91533 7.0559 5.19238 6.74805L7.44238 4.24805C7.58461 4.09004 7.78741 4 8 4Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2409">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
