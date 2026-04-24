import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Log = ({
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
			<g clip-path="url(#clip0_1105_2468)">
				<path d="M3.86035 1.15283C4.21459 0.938275 4.67599 1.05161 4.89062 1.40576C5.10492 1.76001 4.99187 2.22151 4.6377 2.43604C2.75541 3.5763 1.5 5.64243 1.5 8.00049C1.50047 11.5899 4.41044 14.5005 8 14.5005C11.5896 14.5005 14.4995 11.5899 14.5 8.00049C14.5 5.64398 13.2464 3.57873 11.3662 2.43799C11.0122 2.22324 10.8988 1.76182 11.1133 1.40771C11.3281 1.05362 11.7894 0.940988 12.1436 1.15576C14.4535 2.55705 16 5.09805 16 8.00049C15.9995 12.4184 12.418 16.0005 8 16.0005C3.58201 16.0005 0.000468984 12.4184 0 8.00049C0 5.09629 1.54805 2.55359 3.86035 1.15283ZM8 -0.000488281C8.41421 -0.000488281 8.75 0.335298 8.75 0.749512V7.24951C8.75 7.66373 8.41421 7.99951 8 7.99951C7.58579 7.99951 7.25 7.66373 7.25 7.24951V0.749512C7.25 0.335298 7.58579 -0.000488281 8 -0.000488281Z" />
			</g>
			<defs>
				<clipPath id="clip0_1105_2468">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
