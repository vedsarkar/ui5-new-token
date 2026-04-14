import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FormatUnderline = ({
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
			<path d="M3.34619 18.3557V16.8557H16.6537V18.3557H3.34619ZM9.99994 14.7595C8.44477 14.7595 7.23102 14.2874 6.35869 13.3432C5.48619 12.3991 5.04994 11.134 5.04994 9.54798V1.64423H6.90369V9.64023C6.90369 10.6506 7.17227 11.4602 7.70944 12.0692C8.24661 12.6782 9.01011 12.9827 9.99994 12.9827C10.9898 12.9827 11.7533 12.6782 12.2904 12.0692C12.8276 11.4602 13.0962 10.6506 13.0962 9.64023V1.64423H14.9499V9.54798C14.9499 11.134 14.5137 12.3991 13.6412 13.3432C12.7689 14.2874 11.5551 14.7595 9.99994 14.7595Z" />
		</svg>
	);
};
