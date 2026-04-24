import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const RhombusMilestone2 = ({
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
			<g clip-path="url(#clip0_1109_2451)">
				<path d="M6.05605 0.807722C7.13 -0.266112 8.87081 -0.266184 9.94472 0.807722L15.1928 6.05577C16.2664 7.1297 16.2665 8.87058 15.1928 9.94444L9.94472 15.1925C8.87086 16.2662 7.12997 16.2661 6.05605 15.1925L0.807021 9.94444C-0.266431 8.87064 -0.266314 7.12964 0.807021 6.05577L6.05605 0.807722Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2451">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
