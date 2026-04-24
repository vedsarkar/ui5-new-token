import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Video = ({
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
			<g clip-path="url(#clip0_1096_2340)">
				<path d="M9.251 2C10.7698 2 12.001 3.23122 12.001 4.75V5.13965L14.1309 3.45508C14.9385 2.98363 16.0039 3.55758 16.0039 4.54004V11.46C16.0039 12.5078 14.7922 13.0907 13.9737 12.4365L12.001 10.8594V11.25C12.001 12.7688 10.7698 14 9.251 14H2.751C1.23222 14 0.000999471 12.7688 0.000999451 11.25V4.75C0.000999451 3.23122 1.23222 2 2.751 2H9.251ZM2.751 3.5C2.06064 3.5 1.501 4.05964 1.501 4.75V11.25C1.501 11.9404 2.06064 12.5 2.751 12.5H9.251C9.94136 12.5 10.501 11.9404 10.501 11.25V4.75C10.501 4.05964 9.94136 3.5 9.251 3.5H2.751ZM12.251 6.86035V9.13867L14.5039 10.9395V5.05957L12.251 6.86035Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2340">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
