import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CreditCard = ({
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
			<g clip-path="url(#clip0_1095_2323)">
				<path d="M14.25 2C15.2165 2 16 2.7835 16 3.75V5.33984C16 5.78513 16 6.32419 16 6.65918V12.25C16 13.2165 15.2165 14 14.25 14H1.75001C0.783509 14 7.10757e-06 13.2165 7.0975e-06 12.25V6.65918C1.67684e-05 6.30856 -1.29148e-05 5.78903 7.0975e-06 5.33984V3.75C7.0975e-06 2.7835 0.783509 2 1.75001 2H14.25ZM1.50001 12.25C1.50001 12.3881 1.61194 12.5 1.75001 12.5H14.25C14.3881 12.5 14.5 12.3881 14.5 12.25V7H1.50001V12.25ZM7.24903 9.5C7.66324 9.5 7.99903 9.83579 7.99903 10.25C7.99903 10.6642 7.66324 11 7.24903 11H3.75001C3.33579 11 3.00001 10.6642 3.00001 10.25C3.00001 9.83579 3.33579 9.5 3.75001 9.5H7.24903ZM1.75001 3.5C1.61194 3.5 1.50001 3.61193 1.50001 3.75V5H14.5V3.75C14.5 3.61193 14.3881 3.5 14.25 3.5H1.75001Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2323">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
