import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Refresh = ({
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
			<g clip-path="url(#clip0_1109_2465)">
				<path d="M15.25 0C15.6642 0 16 0.335786 16 0.75V5.75C16 6.16421 15.6642 6.5 15.25 6.5H10.25C9.83579 6.5 9.5 6.16421 9.5 5.75C9.5 5.33579 9.83579 5 10.25 5H13.7666C12.682 2.91972 10.5065 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.0011 14.5 13.5295 12.4656 14.2764 9.69922C14.2764 9.69922 14.361 9.3457 14.375 9.27539C14.4558 8.86913 14.8506 8.60575 15.2568 8.68652C15.6631 8.7673 15.9275 9.1621 15.8467 9.56836C15.8467 9.56836 15.7472 10.0026 15.7236 10.0898C14.8046 13.494 11.6961 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C10.6785 0 13.0482 1.31632 14.5 3.33594V0.75C14.5 0.335786 14.8358 0 15.25 0Z" />
			</g>
			<defs>
				<clipPath id="clip0_1109_2465">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
