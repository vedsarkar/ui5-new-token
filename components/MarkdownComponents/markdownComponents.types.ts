import type React from "react";

/**
 * Component whitelist for markdown/MDX custom components.
 * Maps component names to React components allowed in content.
 */
export type ComponentWhitelist = Record<string, React.ComponentType<unknown>>;
