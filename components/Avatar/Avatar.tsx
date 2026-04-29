import { useState } from "react";
import { Person } from "@/icons/Person";
import { classNames } from "@/utils/classNames";
import styles from "./Avatar.module.css";
import type { AvatarProps } from "./Avatar.types";

/**
 * SAP Fiori Avatar
 *
 * Displays a user image, initials, or icon placeholder with SAP Fiori sizing,
 * accent color schemes, and shape variants.
 *
 * @see https://experience.sap.com/fiori-design-web/avatar/
 */
export const Avatar = ({
	src,
	alt = "",
	children,
	size = "m",
	shape = "circle",
	colorScheme,
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
				colorScheme && styles[`accent${colorScheme}`],
				className,
			)}
			style={style}
			role="img"
			aria-label={alt || undefined}
			{...rest}
		>
			{showImage ? (
				<img
					src={src}
					alt=""
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
