import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.types";

export const WarningCopy = ({
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
			viewBox="0 0 21 20"
			fill="currentColor"
			{...props}
		>
			<path d="M0 18.5L10.1345 1L20.269 18.5H0ZM2.5845 17H17.6845L10.1345 4L2.5845 17ZM10.1345 15.8077C10.3633 15.8077 10.5552 15.7303 10.71 15.5755C10.8648 15.4207 10.9423 15.2288 10.9423 15C10.9423 14.7712 10.8648 14.5793 10.71 14.4245C10.5552 14.2697 10.3633 14.1923 10.1345 14.1923C9.90567 14.1923 9.71383 14.2697 9.559 14.4245C9.40417 14.5793 9.32675 14.7712 9.32675 15C9.32675 15.2288 9.40417 15.4207 9.559 15.5755C9.71383 15.7303 9.90567 15.8077 10.1345 15.8077ZM9.3845 13.1923H10.8845V8.19225H9.3845V13.1923Z" />
		</svg>
	);
};
