import type { SideNavigationSubItem as Ui5SideNavigationSubItem } from "@ui5/webcomponents-react/SideNavigationSubItem";
import type { ComponentPropsWithoutRef } from "react";

type Ui5SideNavigationSubItemProps = ComponentPropsWithoutRef<
	typeof Ui5SideNavigationSubItem
>;

/**
 * Reltio `SideNavigationSubItem` — a thin wrapper over
 * `@ui5/webcomponents-react/SideNavigationSubItem` that exposes a deliberately
 * minimal surface. A sub-item is a second-level entry nested inside a
 * `SideNavigationItem`.
 *
 * Only the props below are public. The UI5 `icon` prop is intentionally
 * omitted to enforce the SAP guideline that second-level items do not carry
 * icons; `accessibilityAttributes` and the low-level UI5 `onClick`
 * custom-event handler are likewise hidden and will be re-exposed as dedicated
 * Reltio props on demand.
 */
export type SideNavigationSubItemProps = Pick<
	Ui5SideNavigationSubItemProps,
	| "text"
	| "href"
	| "target"
	| "selected"
	| "disabled"
	| "design"
	| "unselectable"
	| "tooltip"
	| "className"
	| "style"
>;
