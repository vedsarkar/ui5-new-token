import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Warning = ({
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
			<g clip-path="url(#clip0_1096_2336)">
				<path d="M6.49261 1.85413C7.17082 0.713601 8.82281 0.712747 9.50136 1.85315L15.7503 12.3572C16.4441 13.5235 15.6034 15.0014 14.2464 15.0017H1.75342C0.396382 15.0017 -0.443871 13.5237 0.249541 12.3572L6.49261 1.85413ZM7.99552 10.9919C7.44337 10.9919 6.99573 11.4398 6.99554 11.9919C6.9958 12.544 7.44341 12.9919 7.99552 12.9919C8.5474 12.9916 8.99525 12.5438 8.99551 11.9919C8.99531 11.44 8.54744 10.9922 7.99552 10.9919ZM7.99552 3.99185C7.44337 3.99185 6.99573 4.43973 6.99554 4.99186V8.99189C6.9958 9.54396 7.44341 9.9919 7.99552 9.9919C8.5474 9.99162 8.99524 9.54378 8.99551 8.99189V4.99186C8.99531 4.43991 8.54744 3.99213 7.99552 3.99185Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2336">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
