import type React from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
	children: React.ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
	return (
		<button className={styles.root} {...props}>
			{children}
		</button>
	);
};
