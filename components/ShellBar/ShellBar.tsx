import { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { classNames } from "@/utils/classNames";
import styles from "./ShellBar.module.css";
import type { ShellBarProps } from "./ShellBar.types";

const lightLogoUrl = "https://reltio.design/brand/reltio-logo-light.svg";
const darkLogoUrl = "https://reltio.design/brand/reltio-logo-dark.svg";

const defaultReltioLogo = (
	<picture className={styles.logo}>
		<img className={styles.lightLogo} src={lightLogoUrl} alt="Reltio" />
		<img
			className={styles.darkLogo}
			src={darkLogoUrl}
			alt="Reltio"
			aria-hidden="true"
		/>
	</picture>
);

/** Top navigation chrome with the Reltio brand mark in the left `branding` slot. */
export const ShellBar = ({
	logo = defaultReltioLogo,
	className,
	...rest
}: ShellBarProps) => (
	<Ui5ShellBar
		logo={logo}
		className={classNames(styles.root, className)}
		{...rest}
	/>
);
