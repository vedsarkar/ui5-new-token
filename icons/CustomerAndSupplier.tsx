import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CustomerAndSupplier = ({
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
			<path d="M15.25 1C15.6642 1 16 1.33579 16 1.75V14.25C16 14.6642 15.6642 15 15.25 15H0.75C0.551088 15 0.360379 14.9209 0.219727 14.7803C0.0791036 14.6396 0 14.4489 0 14.25V4.75C0 4.33579 0.335786 4 0.75 4H8V1.75C8 1.55109 8.07907 1.36038 8.21973 1.21973C8.36038 1.07907 8.55109 1 8.75 1H15.25ZM1.5 13.5H2C2 12.837 2.26358 12.2013 2.73242 11.7324C3.20126 11.2636 3.83696 11 4.5 11C5.16304 11 5.79874 11.2636 6.26758 11.7324C6.73642 12.2013 7 12.837 7 13.5H8V5.5H1.5V13.5ZM9.5 13.5H14.5V11.5H9.5V13.5ZM4.5 7C5.32843 7 6 7.67157 6 8.5C6 9.32843 5.32843 10 4.5 10C3.67157 10 3 9.32843 3 8.5C3 7.67157 3.67157 7 4.5 7ZM9.5 10H11.25V8.5H9.5V10ZM12.75 10H14.5V8.5H12.75V10ZM9.5 7H11.25V5.5H9.5V7ZM12.75 7H14.5V5.5H12.75V7ZM9.5 4H11.25V2.5H9.5V4ZM12.75 4H14.5V2.5H12.75V4Z" />
		</svg>
	);
};
