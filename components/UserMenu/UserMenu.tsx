import { Avatar } from "@ui5/webcomponents-react/Avatar";
import { Bar } from "@ui5/webcomponents-react/Bar";
import { Button } from "@ui5/webcomponents-react/Button";
import { Dialog } from "@ui5/webcomponents-react/Dialog";
import { UserMenu as Ui5UserMenu } from "@ui5/webcomponents-react/UserMenu";
import { UserMenuAccount } from "@ui5/webcomponents-react/UserMenuAccount";
import { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem";
import { type ComponentRef, useRef, useState } from "react";
import { createPortal } from "react-dom";
import hintIcon from "@/icons/sap/hint";
import { classNames } from "@/utils/classNames";
import styles from "./UserMenu.module.css";
import type { UserMenuProps } from "./UserMenu.types";

const deriveInitials = (name: string): string =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0]?.toUpperCase() ?? "")
		.join("");

const ABOUT_TITLE = "About";
/** Reserved on the built-in About item — consumers must not reuse this attribute. */
const ABOUT_ITEM_ATTR = "data-reltio-user-menu";
const ABOUT_ITEM_VALUE = "about";
const ABOUT_COPYRIGHT = `© ${new Date().getFullYear()} Reltio Inc. All rights reserved.`;
const LEGAL_LINKS = [
	{ label: "Privacy Policy", href: "https://www.reltio.com/privacy-policy/" },
	{
		label: "Terms of Use",
		href: "https://www.reltio.com/reltio-website-terms/",
	},
];

/** Signed-in user avatar that opens a popover with the user's identity, an About modal, and a Sign Out action. */
export const UserMenu = ({
	user,
	appVersion,
	onSignOut,
	children,
	onItemClick,
	className,
	colorScheme = "Accent4",
	...rest
}: UserMenuProps) => {
	const avatarRef = useRef<ComponentRef<typeof Avatar>>(null);
	const [open, setOpen] = useState(false);
	const [aboutOpen, setAboutOpen] = useState(false);

	const initials = deriveInitials(user.username);

	// The popover and About modal are rendered through a portal so they never
	// become slotted light-DOM children of a host like ShellBar — only the
	// avatar (slot="profile") stays inline. Otherwise the host would reserve a
	// layout slot for each closed overlay, producing phantom gaps.
	const overlays = (
		<>
			<Ui5UserMenu
				open={open}
				opener={avatarRef.current ?? undefined}
				accounts={
					<UserMenuAccount
						titleText={user.username}
						subtitleText={user.email}
						avatarSrc={user.avatarUrl}
					/>
				}
				onClose={() => setOpen(false)}
				onItemClick={(event) => {
					setOpen(false);
					if (
						event.detail.item.getAttribute(ABOUT_ITEM_ATTR) === ABOUT_ITEM_VALUE
					) {
						setAboutOpen(true);
						return;
					}
					onItemClick?.(event);
				}}
				onSignOutClick={() => {
					setOpen(false);
					onSignOut();
				}}
			>
				<UserMenuItem
					text={ABOUT_TITLE}
					icon={hintIcon}
					data-reltio-user-menu={ABOUT_ITEM_VALUE}
				/>
				{children}
			</Ui5UserMenu>
			<Dialog
				open={aboutOpen}
				headerText={ABOUT_TITLE}
				className={classNames(styles.aboutDialog)}
				onClose={() => setAboutOpen(false)}
				footer={
					<Bar
						design="Footer"
						endContent={
							<Button design="Transparent" onClick={() => setAboutOpen(false)}>
								Close
							</Button>
						}
					/>
				}
			>
				<div className={classNames(styles.aboutBody)}>
					<p className={classNames(styles.copyright)}>{ABOUT_COPYRIGHT}</p>
					<p className={classNames(styles.version)}>
						<strong>Version:</strong> {appVersion}
					</p>
					<ul className={classNames(styles.legalLinks)}>
						{LEGAL_LINKS.map((link) => (
							<li key={link.href}>
								<a href={link.href} target="_blank" rel="noopener noreferrer">
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</Dialog>
		</>
	);

	return (
		<>
			<Avatar
				ref={avatarRef}
				slot="profile"
				mode="Interactive"
				accessibleName={user.username}
				accessibilityAttributes={{ hasPopup: "menu" }}
				colorScheme={colorScheme}
				initials={user.avatarUrl ? undefined : initials}
				className={classNames(styles.avatar, className)}
				onClick={() => setOpen((value) => !value)}
				{...rest}
			>
				{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : undefined}
			</Avatar>
			{typeof document === "undefined"
				? overlays
				: createPortal(overlays, document.body)}
		</>
	);
};
