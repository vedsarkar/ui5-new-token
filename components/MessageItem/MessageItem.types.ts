import type { MessageItem } from "@ui5/webcomponents-react/MessageItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MessageItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MessageItem` — no Reltio
 * wrapping or prop renaming. Used within `MessageView`. See README.
 */
export type MessageItemProps = ComponentPropsWithoutRef<typeof MessageItem>;
