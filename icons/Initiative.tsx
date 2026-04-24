import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Initiative = ({
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
			<g clip-path="url(#clip0_1105_2389)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM6.19238 5.24805C6.46949 4.94027 6.9441 4.91533 7.25195 5.19238L9.75195 7.44238C10.0779 7.73581 10.0779 8.26419 9.75195 8.55762L7.25195 10.8076C6.9441 11.0847 6.46949 11.0597 6.19238 10.752C5.9153 10.4441 5.94017 9.96947 6.24805 9.69238L8.12891 8L6.24805 6.30762C5.94017 6.03053 5.9153 5.55593 6.19238 5.24805Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2389">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
