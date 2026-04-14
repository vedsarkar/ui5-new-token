import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const OvMarker = ({
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
			<path d="M9.03648 8.24996L5.9115 2H7.58855L9.96353 6.74996H10.0365L12.4115 2H14.0885L10.9635 8.24996H9.03648Z" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14 13.5C14 15.7091 12.2091 17.5 10 17.5C7.79086 17.5 6 15.7091 6 13.5C6 11.2909 7.79086 9.5 10 9.5C12.2091 9.5 14 11.2909 14 13.5ZM12.5 13.5C12.5 14.8807 11.3807 16 10 16C8.61929 16 7.5 14.8807 7.5 13.5C7.5 12.1193 8.61929 11 10 11C11.3807 11 12.5 12.1193 12.5 13.5Z"
			/>
		</svg>
	);
};
