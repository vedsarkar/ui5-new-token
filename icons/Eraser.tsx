import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Eraser = ({
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
			<g clip-path="url(#clip0_1095_2394)">
				<path d="M15.2475 14.5C15.6617 14.5 15.9975 14.8358 15.9975 15.25C15.9975 15.6642 15.6617 16 15.2475 16H9.74751C9.33329 16 8.99751 15.6642 8.99751 15.25C8.99751 14.8358 9.33329 14.5 9.74751 14.5H15.2475ZM15.2475 0C15.6616 2.95755e-05 15.9974 0.335884 15.9975 0.75V3.5C15.9975 3.69834 15.9187 3.88876 15.7788 4.0293L4.37642 15.4785C3.69276 16.1649 2.58104 16.1654 1.89693 15.4795L0.513141 14.0918C-0.169769 13.407 -0.167433 12.2975 0.518024 11.6152L11.9682 0.21875C12.1088 0.0788616 12.2992 -2.16699e-08 12.4975 0H15.2475ZM1.57564 12.6787C1.47808 12.7762 1.4782 12.9345 1.57564 13.0322L2.95943 14.4199C3.05716 14.5178 3.21628 14.5179 3.31392 14.4199L5.24556 12.4795L3.49849 10.7646L1.57564 12.6787ZM4.56099 9.70605L6.30317 11.417L14.1889 3.49902L12.4975 1.80859L4.56099 9.70605Z" />
			</g>
			<defs>
				<clipPath id="clip0_1095_2394">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
