# SideNavigationGroup

`SideNavigationGroup` is a titled section of navigation entries inside a [`SideNavigation`](/?path=/docs/components-sidenavigation--docs). It is a thin wrapper over the SAP Fiori `SideNavigationGroup` (`@ui5/webcomponents-react/SideNavigationGroup`) with a deliberately narrowed API.

Only `text`, `expanded`, `children`, `className`, and `style` are public. Deep-customization UI5 props are intentionally hidden so navigation stays simple and consistent across Reltio applications; dedicated Reltio props will be added on demand as teams need them.

### Usage

Give the group a `text` title and pass `SideNavigationItem` children. Groups cannot nest — a group holds items, not other groups. Use `expanded` to control whether the group is open. Place groups directly inside a `SideNavigation`.

### See also

- [SideNavigation](/?path=/docs/components-sidenavigation--docs) — the menu container that hosts groups
- [SideNavigationItem](/?path=/docs/components-sidenavigationitem--docs) — the entries a group contains
- [SAP Fiori Side Navigation design guideline](https://experience.sap.com/fiori-design-web/side-navigation/) — semantic guidance and visual patterns
