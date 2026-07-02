import { Button } from "@ui5/webcomponents-react/Button";
import { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { ShellBarItem } from "@ui5/webcomponents-react/ShellBarItem";
import { isValidElement, useEffect, useState } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./ShellBar.module.css";
import type { ShellBarProps } from "./ShellBar.types";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/bell.js";

const lightLogoUrl = "https://reltio.design/logo/sap-reltio-light.svg";
const darkLogoUrl = "https://reltio.design/logo/sap-reltio-dark.svg";

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

/** Top navigation chrome with the Reltio brand mark in the `logo` slot. */
export const ShellBar = ({
	logo = defaultReltioLogo,
	className,
	content,
	sideNavigation,
	tenantSelector,
	children,
	userMenu,
	notificationsUrl,
	...rest
}: ShellBarProps) => {
	const hasSideNavigation = isValidElement(sideNavigation);
	const [navOpen, setNavOpen] = useState(false);

	useEffect(() => {
		if (!navOpen) {
			return;
		}
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setNavOpen(false);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [navOpen]);

	return (
		<>
			<Ui5ShellBar
				logo={logo}
				content={
					<>
						{tenantSelector}
						{content}
					</>
				}
				className={classNames(
					styles.root,
					hasSideNavigation && styles.withStartButton,
					className,
				)}
				startButton={
					hasSideNavigation ? (
						<Button
							icon="menu2"
							accessibleName="Toggle navigation"
							tooltip="Toggle navigation"
							onClick={() => setNavOpen((value) => !value)}
						/>
					) : undefined
				}
				{...rest}
			>
				{children}
				{notificationsUrl && (
					<ShellBarItem
						icon="bell"
						text="Notifications"
						onClick={() =>
							window.open(notificationsUrl, "_blank", "noopener,noreferrer")
						}
					/>
				)}
				{userMenu}
			</Ui5ShellBar>
			{hasSideNavigation && (
				<div
					className={classNames(styles.overlay, navOpen && styles.overlayOpen)}
				>
					<button
						type="button"
						aria-label="Close navigation"
						tabIndex={navOpen ? 0 : -1}
						className={styles.backdrop}
						onClick={() => setNavOpen(false)}
					/>
					<aside className={styles.panel} aria-hidden={!navOpen}>
						{sideNavigation}
					</aside>
				</div>
			)}
		</>
	);
};
