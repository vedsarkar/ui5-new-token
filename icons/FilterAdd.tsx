import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FilterAdd = ({
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
			viewBox="0 0 21 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M17.6924 15.1924H20.5V16.6924H17.6924V19.5H16.1924V16.6924H13.3848V15.1924H16.1924V12.3848H17.6924V15.1924ZM16.4902 2.5C16.8144 2.5 17.0449 2.63832 17.1816 2.91504C17.3181 3.19187 17.29 3.45932 17.0977 3.71582L11.5 10.8271V16.6152C11.5 16.8666 11.4154 17.0769 11.2461 17.2461C11.0769 17.4154 10.8666 17.5 10.6152 17.5H9.38477C9.13344 17.5 8.92307 17.4154 8.75391 17.2461C8.58458 17.0769 8.5 16.8666 8.5 16.6152V10.8271L2.90234 3.71582C2.71001 3.45932 2.68186 3.19187 2.81836 2.91504C2.95505 2.63831 3.1856 2.5 3.50977 2.5H16.4902ZM10 10.2998L14.9502 4H5.0498L10 10.2998Z" />
		</svg>
	);
};
