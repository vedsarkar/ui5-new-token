import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Favorite = ({
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
			<g clip-path="url(#clip0_1095_2408)">
				<path d="M8.68404 0.435238L10.7567 5.04226L15.3291 5.49955C15.9358 5.56021 16.2191 6.31231 15.803 6.75805L12.5597 10.2316L13.49 15.1103C13.6052 15.7151 12.9488 16.2025 12.4033 15.9154L7.99999 13.5977L3.59667 15.9154C3.05119 16.2024 2.39481 15.7151 2.51001 15.1103L3.43934 10.2316L0.196953 6.75805C-0.219102 6.31225 0.0641977 5.56029 0.670901 5.49955L5.2423 5.04226L7.36774 0.338505C7.68237 -0.153388 8.44359 -0.0989691 8.68404 0.435238Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2408">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
