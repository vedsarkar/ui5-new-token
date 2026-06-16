# SideNavigationSubItem

`SideNavigationSubItem` is a second-level entry nested inside a [`SideNavigationItem`](/?path=/docs/components-sidenavigationitem--docs). It is a thin wrapper over the SAP Fiori `SideNavigationSubItem` (`@ui5/webcomponents-react/SideNavigationSubItem`) with a deliberately narrowed API.

The public props are `text`, `href`, `target`, `selected`, `disabled`, `design`, `unselectable`, `tooltip`, `className`, and `style`. The UI5 `icon` prop is intentionally omitted to enforce the SAP guideline that second-level items do not carry icons; the deep-customization props (`accessibilityAttributes`) and the low-level UI5 `onClick` custom-event handler are likewise hidden and will be re-exposed as dedicated Reltio props on demand.

### Usage

Pass sub-items as `children` of a `SideNavigationItem` and set `expanded` on the parent to open them. Set `selected` on the active sub-item; items with an `href` behave as links and follow `target`. Mark sub-items `unselectable` when they open in a new tab (`target="_blank"`) or trigger an action (`design="Action"`). Sub-items do not nest further.

### See also

- [SideNavigationItem](/?path=/docs/components-sidenavigationitem--docs) — the parent entry that hosts sub-items
- [SideNavigation](/?path=/docs/components-sidenavigation--docs) — the menu container
- [SAP Fiori Side Navigation design guideline](https://experience.sap.com/fiori-design-web/side-navigation/) — semantic guidance and visual patterns
