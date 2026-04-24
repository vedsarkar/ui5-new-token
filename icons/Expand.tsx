import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const Expand = ({
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
			<path d="M10.7 10.2404C10.982 9.93697 11.4572 9.91934 11.7606 10.2013C12.0638 10.4834 12.0814 10.9589 11.7997 11.2624L8.54668 14.7642C8.25382 15.0792 7.74038 15.0783 7.44803 14.7632L4.19993 11.2614C3.9184 10.9576 3.93641 10.4831 4.23997 10.2013C4.54362 9.91978 5.01792 9.93771 5.29956 10.2414L7.99687 13.1501L10.7 10.2404ZM8.54668 1.2358L11.7997 4.73759C12.0814 5.04114 12.0638 5.51663 11.7606 5.79868C11.4572 6.08066 10.982 6.06303 10.7 5.7596L7.99687 2.84991L5.29956 5.75862C5.01792 6.06229 4.54362 6.08022 4.23997 5.79868C3.93641 5.51686 3.9184 5.04236 4.19993 4.73857L7.44803 1.23678C7.74038 0.921722 8.25382 0.920754 8.54668 1.2358Z" />
		</svg>
	);
};
