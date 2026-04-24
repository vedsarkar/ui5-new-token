import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Cancel = ({
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
			<g clip-path="url(#clip0_1057_2482)">
				<path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM2.90527 3.96582C2.02629 5.07439 1.5 6.47535 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C9.52459 14.5 10.9247 13.9727 12.0332 13.0938L2.90527 3.96582ZM8 1.5C6.47535 1.5 5.07439 2.02629 3.96582 2.90527L13.0938 12.0332C13.9727 10.9247 14.5 9.52459 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_1057_2482">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
