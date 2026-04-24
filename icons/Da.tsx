import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Da = ({
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
			<g clip-path="url(#clip0_153681_472)">
				<path d="M12 0C12.2475 2.04033e-05 12.4794 0.121993 12.6192 0.326274L15.8692 5.07776C16.05 5.34206 16.0426 5.69214 15.8516 5.94913L8.60158 15.7022C8.30639 16.0993 7.69364 16.0993 7.39844 15.7022L0.148377 5.94913C-0.0426493 5.69213 -0.0499916 5.34207 0.130799 5.07776L3.43747 0.253986C3.57884 0.0936257 3.78332 0 3.99997 0H12ZM1.67085 5.48414L8.00001 13.9976L14.3282 5.48414L11.6045 1.50047H4.39548L1.67085 5.48414ZM9.16994 3.23441C9.27994 2.92338 9.7201 2.92338 9.83011 3.23441C10.2001 4.31779 10.68 4.8094 11.7598 5.17057C12.0798 5.28093 12.0798 5.73255 11.7598 5.83288C10.68 6.20408 10.1901 6.68566 9.83011 7.76904C9.7201 8.08007 9.27994 8.08007 9.16994 7.76904C8.79998 6.68567 8.31999 6.19405 7.24024 5.83288C6.92024 5.72252 6.92024 5.2709 7.24024 5.17057C8.31999 4.79937 8.80998 4.31778 9.16994 3.23441Z" />
			</g>
			<defs>
				<clipPath id="clip0_153681_472">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
