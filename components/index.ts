// Endorsed SAP Fiori (UI5) components — the curated surface re-exported
// from `@reltio/design` for every Reltio application. Mirrored here so
// in-monorepo code reaching for them via `@/components` sees the same
// surface the published package exposes. Direct `@ui5/webcomponents-react/X`
// imports remain available inside the monorepo for component authors that
// build Reltio wrappers on top of UI5 (see `components/AGENTS.md`).
//
// `ProductSwitch` and `ProductSwitchItem` are intentionally NOT endorsed:
// the Reltio `AppSelector` business component (re-exported below) is the
// canonical app navigator across every Reltio product and supersedes them.
export { Avatar } from "@ui5/webcomponents-react/Avatar";
export { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
export { Button } from "@ui5/webcomponents-react/Button";
export { Icon } from "@ui5/webcomponents-react/Icon";
export { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
export { Popover } from "@ui5/webcomponents-react/Popover";

// Reltio MDM components & primitives.
export * from "./AppSelector";
export * from "./Chat";
export * from "./Details";
export * from "./ErrorBoundary";
export * from "./Markdown";
export * from "./Skeleton";
export * from "./TextArea";
