# SideNavigationItem

`SideNavigationItem` is a top-level entry in a [`SideNavigation`](/?path=/docs/components-sidenavigation--docs) menu. It is a thin wrapper over the SAP Fiori `SideNavigationItem` (`@ui5/webcomponents-react/SideNavigationItem`) with a deliberately narrowed API.

The public props are `text`, `icon`, `href`, `target`, `selected`, `disabled`, `expanded`, `design`, `unselectable`, `tooltip`, `children`, `className`, and `style`. The deep-customization UI5 props (`accessibilityAttributes`) and the low-level UI5 `onClick` custom-event handler are intentionally hidden so navigation stays simple and consistent across Reltio applications; dedicated Reltio props will be added on demand.

### Selection and navigation

Set `selected` on the active item to highlight it; the menu does not auto-select. Items with an `href` behave as links and follow `target`. Items that open in a new tab (`target="_blank"`) or trigger an action (`design="Action"`) should be marked `unselectable`. Use `disabled` to take an item out of the tab order.

### Sub-items and the collapsed rail

Nest `SideNavigationSubItem` children for a second level and use `expanded` to open the item. Provide a `tooltip` so the item stays discoverable when the menu is collapsed to an icon-only rail or when its `text` truncates. Keep icon usage consistent across a level — all items on a level have icons, or none do.

### See also

- [SideNavigation](/?path=/docs/components-sidenavigation--docs) — the menu container
- [SideNavigationSubItem](/?path=/docs/components-sidenavigationsubitem--docs) — second-level entries nested in an item
- [SideNavigationGroup](/?path=/docs/components-sidenavigationgroup--docs) — groups several items under a title
- [SAP Fiori Side Navigation design guideline](https://experience.sap.com/fiori-design-web/side-navigation/) — semantic guidance and visual patterns
