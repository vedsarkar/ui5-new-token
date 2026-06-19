import type { Option } from "@ui5/webcomponents-react/Option";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Option.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Option` — no Reltio
 * wrapping or prop renaming. Used within `Select`. See README.
 */
export type OptionProps = ComponentPropsWithoutRef<typeof Option>;
