import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ThumbDown = ({
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
			<g clip-path="url(#clip0_1096_2386)">
				<path d="M14.2501 0C15.2226 0 16 0.799433 16.0001 1.76172V8.23828C16 9.20057 15.2226 10 14.2501 10H11.3663L9.26282 15.5176C9.15187 15.8081 8.87262 16 8.56164 16C7.17135 15.9997 6.04905 14.8802 6.04895 13.4893V11.0293H2.76769C0.982318 11.029 -0.328359 9.3588 0.0723756 7.63379L1.42687 1.89941C1.79511 0.774078 2.85592 0.000109486 4.05773 0H14.2501ZM4.05773 1.5C3.50271 1.50011 3.01839 1.8579 2.85168 2.36621L1.53332 7.97461C1.35055 8.7645 1.95413 9.52901 2.76769 9.5293H6.79895C7.213 9.52949 7.54895 9.8652 7.54895 10.2793V13.4893C7.54902 13.8794 7.76672 14.2151 8.08899 14.3838L10.1486 8.98242C10.2594 8.69196 10.5388 8.5001 10.8497 8.5H11.5001V1.5H4.05773ZM13.0001 8.5H14.2501C14.3775 8.5 14.5 8.38891 14.5001 8.23828V1.76172C14.5 1.61109 14.3775 1.5 14.2501 1.5H13.0001V8.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2386">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
