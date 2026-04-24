import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const MasterTaskTriangle2 = ({
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
			<g clip-path="url(#clip0_1105_2477)">
				<path d="M6.4987 1.85315C7.17742 0.713225 8.82937 0.713776 9.50749 1.85413L15.7507 12.3571C16.444 13.5235 15.6036 15.0013 14.2467 15.0016H1.75358C0.396348 15.0014 -0.444295 13.5235 0.249677 12.3571L1.54265 10.1842C2.27487 10.9906 3.33208 11.4976 4.50651 11.4977C6.71514 11.4973 8.50701 9.70532 8.50749 7.49671C8.50739 5.6146 7.20597 4.03552 5.45476 3.60901L6.4987 1.85315ZM4.50554 4.99182C5.8864 4.99182 7.00749 6.11291 7.00749 7.49378C7.00737 8.87454 5.88633 9.99475 4.50554 9.99475C3.12488 9.99459 2.00468 8.87444 2.00456 7.49378C2.00456 6.11301 3.12481 4.99198 4.50554 4.99182Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2477">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
