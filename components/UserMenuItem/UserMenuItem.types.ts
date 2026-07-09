import type { UserMenuItem } from "@ui5/webcomponents-react/UserMenuItem";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori UserMenuItem.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/UserMenuItem` — no Reltio
 * wrapping or prop renaming. Pass as `children` of `UserMenu`. See README.
 */
export type UserMenuItemProps = ComponentPropsWithoutRef<typeof UserMenuItem>;
