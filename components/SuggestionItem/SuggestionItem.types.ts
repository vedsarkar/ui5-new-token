import type { SuggestionItem } from "@ui5/webcomponents-react/SuggestionItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori SuggestionItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/SuggestionItem` — no Reltio
 * wrapping or prop renaming. Used within `Input`. See README.
 */
export type SuggestionItemProps = ComponentPropsWithoutRef<
	typeof SuggestionItem
>;
