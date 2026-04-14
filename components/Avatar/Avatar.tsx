import { useState } from "react";
import { Person } from "@/icons/Person";
import { classNames } from "@/utils/classNames";
import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";

export const Avatar = ({
	src,
	alt = "",
	children,
	size = "md",
	shape = "circle",
	className,
	style,
	...rest
}: AvatarProps) => {
	const [imgError, setImgError] = useState(false);

	const showImage = src && !imgError;

	return (
		<span
			className={classNames(
				styles.root,
				styles[size],
				styles[shape],
				className,
			)}
			style={style}
			{...rest}
		>
			{showImage ? (
				<img
					src={src}
					alt={alt}
					className={classNames(styles.image)}
					onError={() => setImgError(true)}
				/>
			) : children ? (
				children
			) : (
				<span className={classNames(styles.icon)}>
					<Person style={{ width: "100%", height: "100%" }} />
				</span>
			)}
		</span>
	);
};
