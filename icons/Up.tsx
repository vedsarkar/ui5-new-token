import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Up = ({
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
			<g clip-path="url(#clip0_1096_2356)">
				<path d="M1.75333 15.0017C0.396267 15.0017 -0.443999 13.5237 0.249422 12.3572L6.49259 1.85425C7.1707 0.713474 8.82277 0.712793 9.50138 1.85328L15.7504 12.3572C16.4444 13.5237 15.6039 15.0017 14.2465 15.0017L1.75333 15.0017ZM14.2465 13.5017C14.4404 13.5017 14.5605 13.2904 14.4613 13.1238L8.21231 2.61988C8.11537 2.45704 7.87856 2.45704 7.78165 2.61988L1.53848 13.1238C1.43942 13.2904 1.55946 13.5017 1.75333 13.5017L14.2465 13.5017Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2356">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
