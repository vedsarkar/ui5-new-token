import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const AddChild = ({
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
			viewBox="0 0 21 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M14.25 14.75V16.75H15.75V14.75H17.75V13.25H15.75V11.25H14.25V13.25H12.25V14.75H14.25Z" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.25 5.88555C5.26428 5.56698 6 4.61941 6 3.5C6 2.11929 4.88071 1 3.5 1C2.11929 1 1 2.11929 1 3.5C1 4.61941 1.73572 5.56698 2.75 5.88555V12C2.75 13.5188 3.98122 14.75 5.5 14.75H9.55071C9.9165 17.4328 12.2168 19.5 15 19.5C18.0376 19.5 20.5 17.0376 20.5 14C20.5 10.9624 18.0376 8.5 15 8.5C12.2168 8.5 9.9165 10.5672 9.55071 13.25H5.5C4.80964 13.25 4.25 12.6904 4.25 12V5.88555ZM4.5 3.5C4.5 4.05228 4.05228 4.5 3.5 4.5C2.94772 4.5 2.5 4.05228 2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5C4.05228 2.5 4.5 2.94772 4.5 3.5ZM19 14C19 16.2091 17.2091 18 15 18C12.7909 18 11 16.2091 11 14C11 11.7909 12.7909 10 15 10C17.2091 10 19 11.7909 19 14Z"
			/>
		</svg>
	);
};
