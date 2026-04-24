import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Print = ({
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
			<g clip-path="url(#clip0_1109_2486)">
				<path d="M12.2402 0.000976562C12.6544 0.000976563 12.9902 0.336763 12.9902 0.750977V3.00098H13.25C14.7688 3.00098 16 4.23219 16 5.75098V10.251C16 11.7698 14.7688 13.001 13.25 13.001H13V15.249C13 15.6632 12.6642 15.999 12.25 15.999H3.75C3.33579 15.999 3 15.6632 3 15.249V13.001H2.75C1.23122 13.001 4.0266e-09 11.7698 0 10.251V5.75098C0 4.23219 1.23122 3.00098 2.75 3.00098H2.99023V0.750977C2.99023 0.336763 3.32602 0.000976562 3.74023 0.000976562H12.2402ZM4.5 14.499H11.5V9.50098H4.5V14.499ZM2.75 4.50098C2.05964 4.50098 1.5 5.06062 1.5 5.75098V10.251C1.5 10.9413 2.05964 11.501 2.75 11.501H3V8.75098C3.00003 8.33679 3.33581 8.00098 3.75 8.00098H12.25C12.6642 8.00098 13 8.33679 13 8.75098V11.501H13.25C13.9404 11.501 14.5 10.9413 14.5 10.251V5.75098C14.5 5.06062 13.9404 4.50098 13.25 4.50098H2.75ZM4.49023 3.00098H11.4902V1.50098H4.49023V3.00098Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2486">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
