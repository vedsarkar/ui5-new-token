import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const DataPrep = ({
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
			{...props}
		>
			<path d="M12.5 3C12.5 4.38071 11.3807 5.5 10 5.5C8.61929 5.5 7.5 4.38071 7.5 3C7.5 1.61929 8.61929 0.5 10 0.5C11.3807 0.5 12.5 1.61929 12.5 3Z" />
			<path d="M19.5 10C19.5 11.3807 18.3807 12.5 17 12.5C15.6193 12.5 14.5 11.3807 14.5 10C14.5 8.61929 15.6193 7.5 17 7.5C18.3807 7.5 19.5 8.61929 19.5 10Z" />
			<path d="M3 12.5C4.38071 12.5 5.5 11.3807 5.5 10C5.5 8.61929 4.38071 7.5 3 7.5C1.61929 7.5 0.5 8.61929 0.5 10C0.5 11.3807 1.61929 12.5 3 12.5Z" />
			<path d="M12.5 17C12.5 18.3807 11.3807 19.5 10 19.5C8.61929 19.5 7.5 18.3807 7.5 17C7.5 15.6193 8.61929 14.5 10 14.5C11.3807 14.5 12.5 15.6193 12.5 17Z" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H5C5.27614 0.5 5.5 0.723858 5.5 1V5C5.5 5.27614 5.27614 5.5 5 5.5H1C0.723858 5.5 0.5 5.27614 0.5 5V1ZM2 4V2H4V4H2Z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15 0.5C14.7239 0.5 14.5 0.723858 14.5 1V5C14.5 5.27614 14.7239 5.5 15 5.5H19C19.2761 5.5 19.5 5.27614 19.5 5V1C19.5 0.723858 19.2761 0.5 19 0.5H15ZM16 4H18V2H16V4Z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0.5 15C0.5 14.7239 0.723858 14.5 1 14.5H5C5.27614 14.5 5.5 14.7239 5.5 15V19C5.5 19.2761 5.27614 19.5 5 19.5H1C0.723858 19.5 0.5 19.2761 0.5 19V15ZM2 18V16H4V18H2Z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15 14.5C14.7239 14.5 14.5 14.7239 14.5 15V19C14.5 19.2761 14.7239 19.5 15 19.5H19C19.2761 19.5 19.5 19.2761 19.5 19V15C19.5 14.7239 19.2761 14.5 19 14.5H15ZM16 16V18H18V16H16Z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7 7.5C7 7.22386 7.22386 7 7.5 7H12.5C12.7761 7 13 7.22386 13 7.5V12.5C13 12.7761 12.7761 13 12.5 13H7.5C7.22386 13 7 12.7761 7 12.5V7.5ZM8.5 11.5V8.5H11.5V11.5H8.5Z"
			/>
		</svg>
	);
};
