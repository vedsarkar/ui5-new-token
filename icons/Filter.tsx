import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Filter = ({
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
			<path d="M14.2531 1.00244C14.8708 1.00246 15.2253 1.73913 14.8395 2.22119L10.0022 8.26514V12.1528C10.002 12.3742 9.90405 12.5846 9.73439 12.7271L7.23266 14.8267C6.75448 15.2281 5.99938 14.8766 5.99938 14.2524V8.26612L1.16009 2.22119C0.774807 1.73992 1.12994 1.00244 1.74644 1.00244H14.2531ZM7.33625 7.53369C7.4427 7.66668 7.50042 7.83214 7.50042 8.00244V12.6431L8.50112 11.8032V8.00244C8.50112 7.83218 8.55887 7.66667 8.66529 7.53369L12.6925 2.50244H3.30806L7.33625 7.53369Z" />
		</svg>
	);
};
