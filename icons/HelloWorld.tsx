import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const HelloWorld = ({
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
			<g clip-path="url(#clip0_1105_2337)">
				<path d="M7.99512 0C12.3444 7.8681e-05 16 3.6421 16 8C16 12.3551 12.3346 15.9999 7.99512 16H0.75C0.479244 16 0.229593 15.854 0.0966797 15.6182C-0.0361786 15.3821 -0.0312157 15.0919 0.109375 14.8604L1.46191 12.6299C0.520865 11.3194 7.6669e-08 9.72995 0 8C0 3.57864 3.57555 0 7.99512 0ZM1.71191 6.34375C1.57346 6.87238 1.5 7.4275 1.5 8C1.5 9.58031 2.02459 10.991 2.94727 12.1025C3.15156 12.3487 3.17675 12.6973 3.01074 12.9707L2.08203 14.5H7V12.5088C6.11076 12.1615 5.39875 11.1833 5.28711 10.2568L1.71191 6.34375ZM10 3.25C10 3.66421 9.66421 4 9.25 4H7V5.25C7 5.66421 6.66421 6 6.25 6H4.78125L6.56152 8H9.25C9.66421 8 10 8.33579 10 8.75V10.9443H10.3799C11.4081 10.9443 12.3476 11.527 12.7676 12.4082C13.8774 11.2089 14.4902 9.63043 14.4902 8C14.4902 5.10674 12.6073 2.65976 10 1.81543V3.25Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2337">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
