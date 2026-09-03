import type { ShellBarProductSwitchClickEventDetail } from "@ui5/webcomponents-fiori/dist/ShellBar.js";
import type { Ui5CustomEvent } from "@ui5/webcomponents-react";
import { Button } from "@ui5/webcomponents-react/Button";
import type { ShellBarDomRef } from "@ui5/webcomponents-react/ShellBar";
import { ShellBar as Ui5ShellBar } from "@ui5/webcomponents-react/ShellBar";
import { cloneElement, useCallback, useEffect, useState } from "react";
import menu2Icon from "@/icons/sap/menu2";
import { classNames } from "@/utils/classNames";
import { AppSelectorPopover } from "../AppSelectorPopover";
import styles from "./ShellBar.module.css";
import type { ShellBarProps } from "./ShellBar.types";

const lightLogoUrl = "https://reltio.design/logo/reltio-light.svg";
const darkLogoUrl = "https://reltio.design/logo/reltio-dark.svg";

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
	appSelector,
	searchField,
	apps,
	env,
	tenant,
	...rest
}: ShellBarProps) => {
	const [isAppSelectorOpen, setIsAppSelectorOpen] = useState(false);
	const [isSideNavigationOpen, setIsSideNavigationOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	// UI5 hands us the product-switch button node in the click event detail
	// (`event.detail.targetRef`). Snapshot it there instead of chasing the
	// shadow-DOM ref during render or in a mount effect: on click the node is
	// guaranteed to exist (the user just interacted with it), and a fresh
	// reference every click closes any hypothetical resync hazard if UI5
	// were to re-render the shadow DOM between openings.
	const [productSwitchOpener, setProductSwitchOpener] =
		useState<HTMLElement | null>(null);

	const useLegacyAppSelector = !!appSelector && !apps;

	const onProfileClick = useCallback(() => {
		setIsUserMenuOpen((prev) => {
			return !prev;
		});
	}, []);

	const onStartButtonClick = useCallback(() => {
		setIsSideNavigationOpen((prev) => {
			return !prev;
		});
	}, []);

	const onNotificationsClick = useCallback(() => {
		if (!notificationsUrl) {
			return;
		}
		window.open(notificationsUrl, "_blank", "noopener,noreferrer");
	}, [notificationsUrl]);

	const onProductSwitchClick = useCallback(
		(
			event: Ui5CustomEvent<
				ShellBarDomRef,
				ShellBarProductSwitchClickEventDetail
			>,
		) => {
			setProductSwitchOpener(event.detail.targetRef);
			setIsAppSelectorOpen((prev) => {
				return !prev;
			});
		},
		[],
	);

	const onAppSelectorClose = useCallback(() => {
		setIsAppSelectorOpen(false);
	}, []);

	useEffect(() => {
		if (!isSideNavigationOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsSideNavigationOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isSideNavigationOpen]);

	return (
		<>
			<Ui5ShellBar
				logo={logo}
				searchField={searchField}
				showSearchField={!!searchField}
				content={
					<>
						{tenantSelector}
						{content}
					</>
				}
				className={classNames(
					styles.root,
					sideNavigation && styles.withStartButton,
					className,
				)}
				startButton={
					sideNavigation ? (
						<Button
							icon={menu2Icon}
							accessibleName="Toggle navigation"
							tooltip="Toggle navigation"
							onClick={onStartButtonClick}
						/>
					) : undefined
				}
				profile={
					userMenu && !useLegacyAppSelector
						? cloneElement(userMenu, {
								open: isUserMenuOpen,
								onOpenChange: setIsUserMenuOpen,
							})
						: undefined
				}
				onProfileClick={onProfileClick}
				showNotifications={!!notificationsUrl}
				onNotificationsClick={onNotificationsClick}
				showProductSwitch={!!apps}
				onProductSwitchClick={onProductSwitchClick}
				{...rest}
			>
				{children}

				{useLegacyAppSelector && (
					<>
						{userMenu}
						{appSelector}
					</>
				)}
			</Ui5ShellBar>

			{sideNavigation && (
				<div
					className={classNames(
						styles.overlay,
						isSideNavigationOpen && styles.overlayOpen,
					)}
				>
					<button
						type="button"
						aria-label="Close navigation"
						tabIndex={isSideNavigationOpen ? 0 : -1}
						className={styles.backdrop}
						onClick={onStartButtonClick}
					/>
					<aside className={styles.panel} aria-hidden={!isSideNavigationOpen}>
						{sideNavigation}
					</aside>
				</div>
			)}

			{apps && (
				<AppSelectorPopover
					open={isAppSelectorOpen}
					opener={productSwitchOpener ?? undefined}
					apps={apps}
					env={env}
					tenant={tenant}
					onClose={onAppSelectorClose}
				/>
			)}
		</>
	);
};
