import type { NotificationList } from "@ui5/webcomponents-react/NotificationList";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori NotificationList.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/NotificationList` — no
 * Reltio wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `NotificationListItem` and `NotificationListGroupItem`; see README.
 */
export type NotificationListProps = ComponentPropsWithoutRef<
	typeof NotificationList
>;
