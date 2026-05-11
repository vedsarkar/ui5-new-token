import type { Avatar } from "@ui5/webcomponents-react/Avatar";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Reltio-endorsed SAP Fiori Avatar.
 *
 * Type re-exported 1:1 from `@ui5/webcomponents-react/Avatar` — no Reltio
 * wrapping or prop renaming. Use this re-export so apps depend on
 * `@reltio/design` instead of importing from UI5 React directly. See README
 * for guidance on when to pick which `colorScheme`, `shape`, and `size`.
 */
export type AvatarProps = ComponentPropsWithoutRef<typeof Avatar>;
