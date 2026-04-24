import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ProjectDefinitionTriangle = ({
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
			<path d="M2.75263 15.0012C1.45184 15.0012 0.605751 13.6325 1.18721 12.469L6.43818 1.96609C7.0833 0.675859 8.92464 0.676499 9.56904 1.96707L14.8132 12.47C15.3937 13.6334 14.5479 15.0011 13.2478 15.0012H2.75263ZM13.2478 13.5012C13.4333 13.5011 13.554 13.306 13.4714 13.1399L8.22725 2.63699C8.13517 2.45268 7.87213 2.45269 7.77998 2.63699L2.529 13.1399C2.44622 13.3061 2.56692 13.5012 2.75263 13.5012H13.2478Z" />
		</svg>
	);
};
