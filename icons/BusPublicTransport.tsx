import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const BusPublicTransport = ({
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
			<g clip-path="url(#clip0_1057_2411)">
				<path d="M11.75 0C13.2688 1.12747e-07 14.5 1.23122 14.5 2.75V3.75C14.5 3.33579 14.8358 3 15.25 3C15.6642 3 16 3.33579 16 3.75V5C16 5.41421 15.6642 5.75 15.25 5.75H14.5V11.25C14.5 12.1039 14.1107 12.8667 13.5 13.3711V14.75C13.5 15.4404 12.9404 16 12.25 16C11.5596 16 11 15.4404 11 14.75V14H5V14.75C5 15.4404 4.44036 16 3.75 16C3.05964 16 2.5 15.4404 2.5 14.75V13.3711C1.88934 12.8667 1.5 12.1039 1.5 11.25V5.75H0.75C0.335786 5.75 0 5.41421 0 5V3.75C0 3.33579 0.335786 3 0.75 3C1.16421 3 1.5 3.33579 1.5 3.75V2.75C1.5 1.23122 2.73122 2.0133e-08 4.25 0H11.75ZM3 11.25C3 11.9404 3.55964 12.5 4.25 12.5H11.75C12.4404 12.5 13 11.9404 13 11.25V8H3V11.25ZM5 9C5.55228 9 6 9.44771 6 10C6 10.5523 5.55228 11 5 11C4.44772 11 4 10.5523 4 10C4 9.44771 4.44772 9 5 9ZM11 9C11.5523 9 12 9.44771 12 10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10C10 9.44771 10.4477 9 11 9ZM4.25 1.5C3.55964 1.5 3 2.05964 3 2.75V6.5H13V2.75C13 2.05964 12.4404 1.5 11.75 1.5H4.25Z" />
			</g>
			<defs>
				<clipPath id="clip0_1057_2411">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
