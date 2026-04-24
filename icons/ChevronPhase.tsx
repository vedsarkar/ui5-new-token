import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const ChevronPhase = ({
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
			<path d="M10.9836 1.99988C11.5486 1.99991 12.0789 2.27267 12.4074 2.7323L15.8586 7.56433C16.0446 7.82496 16.0446 8.17479 15.8586 8.43542L12.4074 13.2675C12.0789 13.7271 11.5486 13.9998 10.9836 13.9999H0.748217C0.150144 13.9999 -0.209426 13.301 0.137863 12.8143L3.57635 7.99988L0.137863 3.18542C-0.209426 2.69876 0.150144 1.99988 0.748217 1.99988H10.9836ZM5.10858 7.56433C5.29454 7.82496 5.29454 8.17479 5.10858 8.43542L2.20525 12.4999H10.9836C11.0642 12.4998 11.1398 12.4609 11.1867 12.3954L14.3264 7.99988L11.1867 3.60437C11.1398 3.53887 11.0642 3.49991 10.9836 3.49988H2.20525L5.10858 7.56433Z" />
		</svg>
	);
};
