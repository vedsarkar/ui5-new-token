import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Warning2 = ({
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
			<g clip-path="url(#clip0_1096_2335)">
				<path d="M6.4924 1.85425C7.17052 0.713475 8.82259 0.712792 9.50119 1.85328L15.7502 12.3572C16.4441 13.5237 15.6036 15.0017 14.2463 15.0017H1.75314C0.396506 15.0014 -0.443593 13.5235 0.249239 12.3572L6.4924 1.85425ZM8.21213 2.61988C8.11519 2.45704 7.87837 2.45704 7.78147 2.61988L1.5383 13.1238C1.43983 13.2902 1.5597 13.5014 1.75314 13.5017H14.2463C14.4402 13.5017 14.5602 13.2904 14.4612 13.1238L8.21213 2.61988ZM7.99533 10.491C8.54751 10.491 8.99516 10.9388 8.99533 11.491C8.99533 12.0433 8.54762 12.491 7.99533 12.491C7.44323 12.4908 6.99533 12.0431 6.99533 11.491C6.9955 10.939 7.44334 10.4912 7.99533 10.491ZM7.99533 4.99097C8.40944 4.99097 8.74516 5.3269 8.74533 5.74097V8.74097C8.74533 9.15518 8.40955 9.49097 7.99533 9.49097C7.5813 9.49076 7.24533 9.15505 7.24533 8.74097V5.74097C7.2455 5.32703 7.58141 4.99119 7.99533 4.99097Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2335">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
