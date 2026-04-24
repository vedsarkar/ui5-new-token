import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Unfavorite = ({
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
			<g clip-path="url(#clip0_1096_2360)">
				<path d="M8.68396 0.435248L10.7564 5.04227L15.3282 5.49955C15.9349 5.56022 16.2182 6.3123 15.8021 6.75805L12.5591 10.2316L13.4893 15.1103C13.6045 15.7151 12.9482 16.2025 12.4028 15.9154L7.99999 13.5977L3.59719 15.9154C3.05177 16.2025 2.39545 15.7151 2.51065 15.1103L3.43987 10.2316L0.19786 6.75805C-0.218173 6.3123 0.065108 5.56022 0.671754 5.49955L5.24262 5.04227L7.36781 0.338515C7.6824 -0.153368 8.44355 -0.0989988 8.68396 0.435248ZM6.43273 6.05357C6.32259 6.29831 6.09007 6.46558 5.82302 6.49228L2.32794 6.84111L4.79609 9.48611C4.95939 9.66108 5.02945 9.90371 4.98467 10.1388L4.27529 13.8606L7.65019 12.0852C7.86897 11.9701 8.13102 11.9701 8.3498 12.0852L11.7237 13.8606L11.0153 10.1388C10.9705 9.90371 11.0406 9.66108 11.2039 9.48611L13.6711 6.84111L10.177 6.49228C9.90992 6.46558 9.6774 6.29831 9.56726 6.05357L7.99999 2.57021L6.43273 6.05357Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2360">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
