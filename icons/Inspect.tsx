import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Inspect = ({
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
			<g clip-path="url(#clip0_1105_2394)">
				<path d="M0.75 2.99609C1.16421 2.99609 1.5 3.33188 1.5 3.74609V13.25C1.5 13.9404 2.05964 14.5 2.75 14.5H11.75C12.1642 14.5 12.5 14.8358 12.5 15.25C12.5 15.6642 12.1642 16 11.75 16H2.75C1.23122 16 2.23979e-08 14.7688 0 13.25V3.74609C0 3.33188 0.335786 2.99609 0.75 2.99609ZM13.25 0C14.7688 1.12747e-07 16 1.23122 16 2.75V10.25C16 11.7688 14.7688 13 13.25 13H5.75C4.23122 13 3 11.7688 3 10.25V2.75C3 1.23122 4.23122 2.0133e-08 5.75 0H13.25ZM5.75 1.5C5.05964 1.5 4.5 2.05964 4.5 2.75V10.25C4.5 10.9404 5.05964 11.5 5.75 11.5H13.25C13.9404 11.5 14.5 10.9404 14.5 10.25V2.75C14.5 2.05964 13.9404 1.5 13.25 1.5H5.75ZM11.25 4C11.6642 4 12 4.33579 12 4.75V7.25C12 7.66421 11.6642 8 11.25 8C10.8358 8 10.5 7.66421 10.5 7.25V6.50488L8.00781 8.80176C7.70319 9.08213 7.22883 9.06231 6.94824 8.75781C6.66787 8.45319 6.68769 7.97883 6.99219 7.69824L9.37793 5.5H8.75C8.33579 5.5 8 5.16421 8 4.75C8 4.33579 8.33579 4 8.75 4H11.25Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2394">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
