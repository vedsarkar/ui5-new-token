import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const CircleTask2 = ({
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
			<g clip-path="url(#clip0_1057_2600)">
				<path d="M8 -0.00012207C12.4183 -0.00012207 16 3.5816 16 7.99988C16 12.4182 12.4183 15.9999 8 15.9999C3.58172 15.9999 0 12.4182 0 7.99988C0 3.5816 3.58172 -0.00012207 8 -0.00012207Z" />
			</g>
			<defs>
				<clipPath id="clip0_1057_2600">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
