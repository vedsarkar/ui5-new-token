import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MessageWarning = ({
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
			<g clip-path="url(#clip0_1105_2500)">
				<path d="M6.4924 1.85425C7.17052 0.713475 8.82259 0.712792 9.50119 1.85328L15.7502 12.3572C16.4441 13.5237 15.6036 15.0017 14.2463 15.0017H1.75314C0.396506 15.0014 -0.443593 13.5235 0.249239 12.3572L6.4924 1.85425ZM8.21213 2.61988C8.11519 2.45704 7.87837 2.45704 7.78147 2.61988L1.5383 13.1238C1.43983 13.2902 1.5597 13.5014 1.75314 13.5017H14.2463C14.4402 13.5017 14.5602 13.2904 14.4612 13.1238L8.21213 2.61988ZM8.0011 10.4983C8.55328 10.4983 9.00093 10.9461 9.0011 11.4983C9.0011 12.0506 8.55338 12.4983 8.0011 12.4983C7.449 12.4981 7.0011 12.0504 7.0011 11.4983C7.00127 10.9463 7.4491 10.4985 8.0011 10.4983ZM8.0011 4.99829C8.41521 4.99829 8.75093 5.33422 8.7511 5.74829V8.74097C8.7511 9.15518 8.41531 9.49829 8.0011 9.49829C7.58707 9.49808 7.24533 9.16237 7.24533 8.74829L7.2511 5.74829C7.25127 5.33435 7.58717 4.99851 8.0011 4.99829Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2500">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
