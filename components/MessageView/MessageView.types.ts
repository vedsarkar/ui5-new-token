import type { MessageView } from "@ui5/webcomponents-react/MessageView";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori MessageView.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/MessageView` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. Compose with
 * `MessageItem`; open it from a `MessageViewButton`. See README.
 */
export type MessageViewProps = ComponentPropsWithoutRef<typeof MessageView>;
