## ADDED Requirements

### Requirement: Platform-internal UI5 registration only

SAP icon modules SHALL perform the `@ui5/webcomponents-icons/dist/<kebab-name>.js` side-effect import inside `@reltio/design` platform source. Consumer application code SHALL NOT require any direct `@ui5/*` import to register or render a standard SAP icon.

#### Scenario: Consumer source has no ui5 icon imports

- **WHEN** an application uses SAP icons exclusively via `@reltio/design/icons/sap/<kebab-name>` imports
- **THEN** a repository search for `@ui5/webcomponents-icons` in application source returns no matches

### Requirement: Default SAP-icons collection only in v1

v1 SHALL cover only icons from the default `@ui5/webcomponents-icons` package (the `SAP-icons` collection). Icons from `tnt` and `business-suite` collections SHALL NOT be published under `@reltio/design/icons/sap/` in this capability.

#### Scenario: Standard SAP icon is published

- **WHEN** `save` exists in the pinned `@ui5/webcomponents-icons` dist folder
- **THEN** `@reltio/design/icons/sap/save` is published per the `icon-modules` contract

#### Scenario: TNT icon is out of scope

- **WHEN** a consumer needs a `tnt/*` icon
- **THEN** v1 does not provide `@reltio/design/icons/sap/<kebab-name>` for that collection

### Requirement: SAP modules generated from pinned UI5 package

The platform SHALL generate SAP icon modules by enumerating `node_modules/@ui5/webcomponents-icons/dist/*.js` (excluding aggregate bundles such as `AllIcons`). Generated source SHALL live in `icons/sap/`. Compiled output SHALL publish at `dist/icons/sap/<kebab-name>.js`.

#### Scenario: Regeneration tracks UI5 pin

- **WHEN** a maintainer runs `npm run build-sap-icons` after a pinned `@ui5/webcomponents-icons` version bump
- **THEN** the generated `icons/sap/` modules reflect the icon set of the new pin
