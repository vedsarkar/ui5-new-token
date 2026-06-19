import type { MessageViewButton } from "@ui5/webcomponents-react/MessageViewButton";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MessageViewButton.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MessageViewButton` — no Reltio
 * wrapping or prop renaming. Used within `MessageView`. See README.
 */
export type MessageViewButtonProps = ComponentPropsWithoutRef<
	typeof MessageViewButton
>;
