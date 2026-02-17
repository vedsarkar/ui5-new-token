import { classNames } from "@/utils/classNames";
import styles from "./Divider.module.css";
import type { DividerProps } from "./Divider.types";

export const Divider = ({ className, ...rest }: DividerProps) => {
	return <hr className={classNames(styles.root, className)} {...rest} />;
};
