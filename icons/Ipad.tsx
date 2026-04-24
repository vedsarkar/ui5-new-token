import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Ipad = ({
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
			<path d="M13.0005 0C14.1049 0.000213862 15.0005 0.895562 15.0005 2V14C15.0005 15.1044 14.1049 15.9998 13.0005 16H3.00049C1.8679 16 0.999512 15.1055 0.999512 14L1.00049 2C1.00049 0.895431 1.89592 0 3.00049 0H13.0005ZM2.49951 14H13.5005V2H2.50049L2.49951 14Z" />
		</svg>
	);
};
