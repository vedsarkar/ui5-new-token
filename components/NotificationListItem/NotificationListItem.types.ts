import type { NotificationListItem } from "@ui5/webcomponents-react/NotificationListItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori NotificationListItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/NotificationListItem` — no Reltio
 * wrapping or prop renaming. Used within `NotificationList`. See README.
 */
export type NotificationListItemProps = ComponentPropsWithoutRef<
	typeof NotificationListItem
>;
