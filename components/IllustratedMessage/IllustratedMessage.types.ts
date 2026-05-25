import type { IllustratedMessage } from "@ui5/webcomponents-react/IllustratedMessage";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori IllustratedMessage.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/IllustratedMessage` —
 * no Reltio wrapping or prop renaming. Use it for empty states, error
 * pages, success confirmations, and any other "page-level" status moment
 * that needs a Fiori illustration plus title + subtitle copy.
 */
export type IllustratedMessageProps = ComponentPropsWithoutRef<
	typeof IllustratedMessage
>;
