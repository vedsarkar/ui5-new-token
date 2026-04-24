import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MultiplePieChart = ({
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
			<g clip-path="url(#clip0_1105_2514)">
				<path d="M3.5 9C5.47255 9 7 10.5275 7 12.5C7 14.4725 5.47255 16 3.5 16C1.52745 16 3.25936e-08 14.4725 0 12.5C0 10.5275 1.52745 9 3.5 9ZM12.5 9C14.4725 9 16 10.5275 16 12.5C16 14.4725 14.4725 16 12.5 16C10.5275 16 9 14.4725 9 12.5C9 10.5275 10.5275 9 12.5 9ZM3.5 10.5C2.35588 10.5 1.5 11.3559 1.5 12.5C1.5 13.1415 1.76895 13.6925 2.20703 14.0527L3.75 12.5088V10.5146C3.66839 10.5054 3.58503 10.5 3.5 10.5ZM3.5 0C5.47255 0 7 1.52745 7 3.5C7 5.47255 5.47255 7 3.5 7C1.52745 7 0 5.47255 0 3.5C9.27682e-08 1.52745 1.52745 9.27664e-08 3.5 0ZM12.5 0C14.4725 3.25942e-08 16 1.52745 16 3.5C16 5.47255 14.4725 7 12.5 7C10.5275 7 9 5.47255 9 3.5C9 1.52745 10.5275 0 12.5 0ZM3.5 1.5C2.35588 1.5 1.5 2.35588 1.5 3.5C1.5 4.64412 2.35588 5.5 3.5 5.5C4.64412 5.5 5.5 4.64412 5.5 3.5H3.5V1.5ZM12.5 1.5C11.3559 1.5 10.5 2.35588 10.5 3.5C10.5 4.64412 11.3559 5.5 12.5 5.5C12.5854 5.5 12.669 5.49368 12.751 5.48438L12.75 3.75V1.51465C12.6684 1.50543 12.585 1.5 12.5 1.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2514">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
