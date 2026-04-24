import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Male = ({
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
			<g clip-path="url(#clip0_51056_10709)">
				<path d="M15.2529 0C15.6655 0 16 0.335786 16 0.75V4.25C16 4.66421 15.6655 5 15.2529 5C14.8403 5 14.5058 4.66421 14.5058 4.25V2.49805L9.84338 7.17773C10.5417 8.10089 10.9572 9.25144 10.9572 10.5C10.9572 13.5376 8.50435 16 5.4786 16C2.45285 16 0 13.5376 0 10.5C0 7.46243 2.45285 5 5.4786 5C6.72182 5 7.86759 5.41668 8.78697 6.11719L13.3872 1.5H11.7665C11.3539 1.5 11.0195 1.16421 11.0195 0.75C11.0195 0.335786 11.3539 0 11.7665 0H15.2529ZM5.4786 6.5C3.27806 6.5 1.49416 8.29086 1.49416 10.5C1.49416 12.7091 3.27806 14.5 5.4786 14.5C7.67914 14.5 9.46303 12.7091 9.46303 10.5C9.46303 8.29086 7.67914 6.5 5.4786 6.5Z" />
			</g>
			<defs>
				<clipPath id="clip0_51056_10709">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
