import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const SelectedNode = ({
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
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M2.99996 4.5C2.99996 5.88071 4.11925 7 5.49996 7C6.88068 7 7.99996 5.88071 7.99996 4.5C7.99996 3.11929 6.88068 2 5.49996 2C4.11925 2 2.99996 3.11929 2.99996 4.5ZM4.49996 4.5C4.49996 5.05228 4.94768 5.5 5.49996 5.5C6.05225 5.5 6.49996 5.05228 6.49996 4.5C6.49996 3.94772 6.05225 3.5 5.49996 3.5C4.94768 3.5 4.49996 3.94772 4.49996 4.5Z"
			/>
			<path d="M9.49996 11.5C8.67154 11.5 7.99996 10.8284 7.99996 10C7.99996 9.17157 8.67154 8.5 9.49996 8.5C10.3284 8.5 11 9.17157 11 10C11 10.8284 10.3284 11.5 9.49996 11.5Z" />
			<path d="M9.49996 16.5C8.67154 16.5 7.99996 15.8284 7.99996 15C7.99996 14.1716 8.67154 13.5 9.49996 13.5C10.3284 13.5 11 14.1716 11 15C11 15.8284 10.3284 16.5 9.49996 16.5Z" />
			<path d="M3.25 18.1442L6.39425 15L3.25 11.8557L2.19625 12.9L3.53075 14.25H0V15.75H3.53075L2.19625 17.1L3.25 18.1442Z" />
			<path d="M9.99996 5.25H20V3.75H9.99996V5.25Z" />
			<path d="M20 10.75H13V9.25H20V10.75Z" />
			<path d="M13 15.75H20V14.25H13V15.75Z" />
		</svg>
	);
};
