import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Upload = ({
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
			<g clip-path="url(#clip0_1096_2355)">
				<path d="M15.25 14.4982C15.6642 14.4982 16 14.8339 16 15.2482C16 15.6624 15.6642 15.9982 15.25 15.9982H0.75C0.335786 15.9982 0 15.6624 0 15.2482C0 14.8339 0.335786 14.4982 0.75 14.4982H15.25ZM8.55176 0.238395L11.7998 3.7384C12.0813 4.04204 12.0633 4.51629 11.7598 4.79797C11.4561 5.0795 10.9819 5.06148 10.7002 4.75793L8.75 2.65539V11.2482C8.75 11.6624 8.41421 11.9982 8 11.9982C7.58579 11.9982 7.25 11.6624 7.25 11.2482V2.66027L5.2998 4.7589C5.01787 5.06231 4.5427 5.07985 4.23926 4.79797C3.93585 4.51603 3.91831 4.04086 4.2002 3.73742L7.45312 0.237419C7.74596 -0.0774399 8.25946 -0.0766063 8.55176 0.238395Z" />
			</g>
			<defs>
				<clipPath id="clip0_1096_2355">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
