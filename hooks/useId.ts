import { useMemo } from "react";

let counter = 0;

/**
 * Generates a stable unique ID for accessibility attributes (aria-labelledby, etc.).
 * Replacement for React 18's useId() — needed because this project uses React 17.
 *
 * @param prefix - Optional prefix for readability (e.g., "textfield", "select")
 * @returns A unique string ID stable across re-renders
 */
export const useId = (prefix = "reltio"): string => {
	return useMemo(() => `${prefix}-${++counter}`, [prefix]);
};
