import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Alert = ({
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
			<g clip-path="url(#clip0_1016_2398)">
				<path d="M6.49243 1.85412C7.17064 0.713611 8.82263 0.712744 9.50117 1.85315L15.7501 12.3572C16.4439 13.5236 15.6033 15.0015 14.2462 15.0017H1.75324C0.396622 15.0014 -0.443464 13.5235 0.249357 12.3572L6.49243 1.85412ZM7.99534 10.9919C7.44309 10.9919 6.99535 11.4396 6.99535 11.9919C6.99561 12.544 7.44325 12.9919 7.99534 12.9919C8.54745 12.9919 8.99506 12.544 8.99532 11.9919C8.99532 11.4396 8.54761 10.9919 7.99534 10.9919ZM7.99534 3.99184C7.44309 3.99187 6.99535 4.43958 6.99535 4.99185V8.99189C6.99562 9.54393 7.44325 9.99186 7.99534 9.9919C8.54745 9.9919 8.99506 9.54395 8.99532 8.99189V4.99185C8.99532 4.43956 8.54761 3.99184 7.99534 3.99184Z" />
			</g>
			<defs>
				<clipPath id="clip0_1016_2398">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
