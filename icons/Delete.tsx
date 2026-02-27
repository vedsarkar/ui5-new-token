import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Delete = ({
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
			{...props}
		>
			<path d="M5.30775 18.5C4.80908 18.5 4.38308 18.3234 4.02975 17.9703C3.67658 17.6169 3.5 17.1909 3.5 16.6923V4.00001H2.5V2.50001H7V1.61551H13V2.50001H17.5V4.00001H16.5V16.6923C16.5 17.1974 16.325 17.625 15.975 17.975C15.625 18.325 15.1974 18.5 14.6923 18.5H5.30775ZM15 4.00001H5V16.6923C5 16.7821 5.02883 16.8558 5.0865 16.9135C5.14417 16.9712 5.21792 17 5.30775 17H14.6923C14.7692 17 14.8398 16.9679 14.9038 16.9038C14.9679 16.8398 15 16.7693 15 16.6923V4.00001ZM7.404 15H8.90375V6.00001H7.404V15ZM11.0962 15H12.596V6.00001H11.0962V15Z" />
		</svg>
	);
};
