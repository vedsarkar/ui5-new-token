import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ApiPerformanceStat = ({
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
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M5.19141 13.7471C5.74127 13.7471 6.19121 14.1972 6.19141 14.7471V19.7471H4.69141V18.2471H2.69141V19.7471H1.19141V14.7471C1.19161 14.1972 1.64154 13.7471 2.19141 13.7471H5.19141ZM10.6914 13.7471C11.4913 13.7471 12.1912 14.4472 12.1914 15.2471V16.2471C12.1914 17.0471 11.4914 17.7471 10.6914 17.7471H8.69141V19.7471H7.19141V13.7471H10.6914ZM14.6914 19.7471H13.1914V13.7471H14.6914V19.7471ZM2.69141 16.7471H4.69141V15.2471H2.69141V16.7471ZM8.69141 16.2471H10.6914V15.2471H8.69141V16.2471ZM15 5H19V14L9.59961 6.65039L5.625 12.125L1 8.5V5L5 8L10 1L15 5Z" />
		</svg>
	);
};
