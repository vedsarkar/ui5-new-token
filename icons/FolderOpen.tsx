import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const FolderOpen = ({
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
			viewBox="0 0 22 20"
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M2.25 17.5C1.76417 17.5 1.351 17.3298 1.0105 16.9895C0.670167 16.649 0.5 16.2358 0.5 15.75V4.30775C0.5 3.82192 0.679833 3.39917 1.0395 3.0395C1.39917 2.67983 1.82192 2.5 2.30775 2.5H7.798L9.798 4.5H17.6923C18.1398 4.5 18.5257 4.64458 18.85 4.93375C19.1743 5.22275 19.3622 5.57817 19.4135 6H9.1845L7.1845 4H2.30775C2.21792 4 2.14417 4.02883 2.0865 4.0865C2.02883 4.14417 2 4.21792 2 4.30775V15.6923C2 15.7628 2.01767 15.8204 2.053 15.8652C2.08817 15.9102 2.13458 15.9488 2.19225 15.9808L4.525 8.19225H21.1828L18.7615 16.2578C18.6473 16.6333 18.4336 16.9342 18.1203 17.1605C17.8068 17.3868 17.459 17.5 17.077 17.5H2.25ZM3.7635 16H17.2693L19.1558 9.69225H5.65L3.7635 16Z" />
		</svg>
	);
};
