import { classNames } from "@/utils/classNames";
import styles from "./Breadcrumbs.module.css";
import type { BreadcrumbProps } from "./Breadcrumbs.types";

export const Breadcrumb = ({
	href,
	children,
	className,
	...rest
}: BreadcrumbProps) => {
	if (href) {
		return (
			<a href={href} className={classNames(styles.link, className)} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<span
			aria-current="page"
			className={classNames(styles.current, className)}
			{...rest}
		>
			{children}
		</span>
	);
};
