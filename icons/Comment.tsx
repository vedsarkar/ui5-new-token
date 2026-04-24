import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Comment = ({
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
			<g clip-path="url(#clip0_1057_2620)">
				<path d="M13.6387 0C14.939 0 16 1.06143 16 2.36229V10.1789C16 11.4798 14.939 12.5412 13.6387 12.5412H4.29883L1.29883 15.7671C0.844567 16.2555 6.7571e-07 15.9234 0 15.2562V2.36229C0 1.06143 1.061 0 2.36133 0H13.6387ZM2.36133 1.50061C1.88943 1.50061 1.5 1.8902 1.5 2.36229V13.3482L3.47852 11.2262C3.61456 11.1072 3.79018 11.0406 3.97266 11.0406H13.6387C14.1106 11.0406 14.5 10.651 14.5 10.1789V2.36229C14.5 1.8902 14.1106 1.50061 13.6387 1.50061H2.36133ZM9.25 7.00284C9.66421 7.00284 10 7.33876 10 7.75314C10 8.16752 9.66421 8.50344 9.25 8.50344H4.75C4.33579 8.50344 4 8.16752 4 7.75314C4 7.33876 4.33579 7.00284 4.75 7.00284H9.25ZM11.25 4.00162C11.6642 4.00162 12 4.33754 12 4.75192C12 5.16631 11.6642 5.50223 11.25 5.50223H4.75C4.33579 5.50223 4 5.16631 4 4.75192C4 4.33754 4.33579 4.00162 4.75 4.00162H11.25Z" />
			</g>
			<defs>
				<clipPath id="clip0_1057_2620">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
