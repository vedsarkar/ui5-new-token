import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Survivorship = ({
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
			<path d="M15.6345 14.4423H8V12.9423H15.6345V14.4423Z" />
			<path d="M15.6345 10.75H8V9.25H15.6345V10.75Z" />
			<path d="M15.5 7.05775H8V5.55775H15.5V7.05775Z" />
			<path d="M4.25 5.64575L4.25 14.4901H5.75L5.75 5.64575H4.25Z" />
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M1.025 17.975C1.375 18.325 1.80258 18.5 2.30775 18.5H17.6923C18.1974 18.5 18.625 18.325 18.975 17.975C19.325 17.625 19.5 17.1974 19.5 16.6923V3.30775C19.5 2.80258 19.325 2.375 18.975 2.025C18.625 1.675 18.1974 1.5 17.6923 1.5H2.30775C1.80258 1.5 1.375 1.675 1.025 2.025C0.675 2.375 0.5 2.80258 0.5 3.30775V16.6923C0.5 17.1974 0.675 17.625 1.025 17.975ZM17.6923 17H2.30775C2.23075 17 2.16025 16.9679 2.09625 16.9038C2.03208 16.8398 2 16.7692 2 16.6923V3.30775C2 3.23075 2.03208 3.16025 2.09625 3.09625C2.16025 3.03208 2.23075 3 2.30775 3H17.6923C17.7693 3 17.8398 3.03208 17.9038 3.09625C17.9679 3.16025 18 3.23075 18 3.30775V16.6923C18 16.7692 17.9679 16.8398 17.9038 16.9038C17.8398 16.9679 17.7693 17 17.6923 17Z"
			/>
		</svg>
	);
};
