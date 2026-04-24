import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const PptAttachment = ({
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
			<path d="M11.25 0C12.2165 6.44266e-08 13 0.783502 13 1.75V6.25C12.9998 6.66403 12.6641 7 12.25 7C11.8359 7 11.5002 6.66403 11.5 6.25V1.75C11.5 1.61193 11.3881 1.5 11.25 1.5H6.70996C6.63716 1.5 6.56799 1.53176 6.52051 1.58691L6 2.19336V5.25C6 5.66421 5.66421 6 5.25 6H2.73828C2.64907 6.10391 2.5 6.37012 2.5 6.37012V14.25C2.5 14.3881 2.61193 14.5 2.75 14.5H4.25195C4.66609 14.5001 5.00195 14.8358 5.00195 15.25C5.00195 15.6642 4.66609 15.9999 4.25195 16H2.75C1.7835 16 1 15.2165 1 14.25V6.37012C1 5.95256 1.14927 5.54856 1.4209 5.23145L5.38086 0.611328C5.71333 0.223448 6.19909 0 6.70996 0H11.25ZM15.25 9C15.6642 9 16 9.33579 16 9.75V15.25C16 15.6642 15.6642 16 15.25 16H7.75C7.33579 16 7 15.6642 7 15.25V9.75C7 9.33579 7.33579 9 7.75 9H15.25ZM8.5 14.5H14.5V10.5H8.5V14.5Z" />
		</svg>
	);
};
