import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Map3 = ({
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
			<g clip-path="url(#clip0_1105_2474)">
				<path d="M5.08203 0.0186402C5.22184 -0.0134633 5.36913 -0.00460911 5.50586 0.0450074L10.7217 1.94149L14.9453 0.0645386C15.4323 -0.151914 16 0.217163 16 0.750086V13.5001C16 13.8094 15.8098 14.0872 15.5215 14.1993L11.0215 15.9493C10.8619 16.0113 10.6856 16.0169 10.5225 15.9649L5.27441 14.295L1.02148 15.9493C0.537887 16.1371 0 15.7688 0 15.2501V2.75009C0 2.45369 0.174466 2.18491 0.445312 2.06454L5.08203 0.0186402ZM6 12.9513L10 14.2237V3.27548L6 1.8204V12.9513ZM1.5 3.23739V14.1534L4.5 12.9864V1.90438L1.5 3.23739ZM11.5 3.23739V14.1534L14.5 12.9864V1.90438L11.5 3.23739Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2474">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
