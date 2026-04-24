import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Collapse = ({
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
			<path d="M8.54304 9.23544L12.7951 13.7355C13.079 14.0366 13.0657 14.5108 12.7648 14.7951C12.4639 15.0793 11.9897 15.0654 11.7052 14.7648L7.99713 10.8429L4.29491 14.7648C4.01069 15.0657 3.53651 15.079 3.23532 14.7951C2.93425 14.5107 2.92077 14.0367 3.20505 13.7355L7.4522 9.23544C7.74412 8.92618 8.251 8.92639 8.54304 9.23544ZM11.7052 1.23533C11.9897 0.934307 12.4637 0.9207 12.7648 1.20505C13.0654 1.48954 13.0793 1.9637 12.7951 2.26464L8.54304 6.7647C8.25089 7.07386 7.74434 7.07372 7.4522 6.7647L3.20505 2.26464C2.92076 1.96347 2.93424 1.4894 3.23532 1.20505C3.53649 0.920778 4.01057 0.934252 4.29491 1.23533L7.99713 5.15725L11.7052 1.23533Z" />
		</svg>
	);
};
