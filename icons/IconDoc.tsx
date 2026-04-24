import type { IconColor, IconSize } from "./Icon.types";

type IconDocProps = {
	/** Icon size. @default "medium" */
	size?: IconSize;
	/** Icon color. Inherits from parent by default. @default "inherited" */
	color?: IconColor;
};

/**
 * SVG icon components from the Reltio Design icon library.
 *
 * Import individual icons by name:
 *
 * ```tsx
 * import { Search, Settings, Add } from "@reltio/design/icons";
 *
 * <Search />
 * <Settings size="large" />
 * <Add size="small" color="primary" />
 * ```
 *
 * All standard SVG attributes are also supported via rest props.
 */
export const Icon = (_props: IconDocProps) => null;
