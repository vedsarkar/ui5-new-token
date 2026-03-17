# app-selector-component Specification

## Purpose
Navigation popover for switching between Reltio platform applications. Displays apps grouped by category in a grid layout.

## Requirements

### Requirement: Component Structure

The AppSelector component SHALL follow the mandatory component structure with `AppSelector.tsx`, `AppSelector.types.ts`, `AppSelector.module.css`, `AppSelector.stories.tsx`, and `index.ts`. It SHALL be located at `components/AppSelector/`.

#### Scenario: Component files exist

- **WHEN** the AppSelector component is created
- **THEN** all required files exist in `components/AppSelector/`
- **AND** the public API is exported through `index.ts`

### Requirement: Self-Contained Popover

The AppSelector component SHALL render both a trigger button and a Popover. The trigger SHALL be a button containing the Applications icon from the icon system. The Popover SHALL contain the app grid content.

#### Scenario: Trigger renders as icon button

- **WHEN** the AppSelector component is rendered
- **THEN** a button with the applications grid icon is visible
- **AND** the button is interactive and toggles the popover on click

#### Scenario: Popover opens on trigger click

- **WHEN** the user clicks the trigger button
- **THEN** a popover appears with the app grid content
- **AND** the popover uses the existing Popover component internally

#### Scenario: Popover closes on app click

- **WHEN** the user clicks an app item inside the popover
- **THEN** the popover closes automatically (native Popover auto-close behavior)
- **AND** the app URL opens in a new browser tab

### Requirement: Apps Prop

The AppSelector component SHALL accept an `apps` prop of type `AppEntry[]`. All fields in `AppEntry` are optional. The list of available apps for a given tenant can be retrieved from Reltio Config Service.

#### Scenario: Full app entry

- **WHEN** a consumer provides `apps={[{ name: "Hub", uri: "/hub", icon: "https://reltio.design/apps/icons/mdm.svg", category: "Data Cloud" }]}`
- **THEN** the app is displayed with the provided name, icon, and category

#### Scenario: Apps without name or uri are ignored

- **WHEN** the apps prop contains entries missing `name` or `uri` (or both)
- **THEN** those entries are silently filtered out
- **AND** no runtime error is thrown

### Requirement: Default Values

The AppSelector component SHALL apply sensible defaults for optional fields in `AppEntry`.

#### Scenario: Default category

- **WHEN** an app entry does not specify a `category`
- **THEN** the app is grouped under the "Applications" category

#### Scenario: Default icon

- **WHEN** an app entry does not specify an `icon`
- **THEN** the Link icon from the icon system is rendered at `xlarge` size instead of an `<img>` element

### Requirement: URI Templates

The AppSelector component SHALL support URI templates with `${environment}` and `${tenant}` placeholders in `AppEntry.uri`. Optional `env` and `tenant` props provide the values for substitution. When a prop is not provided, `"undefined"` is substituted.

#### Scenario: Placeholders resolved with provided values

- **WHEN** `env="us-prod"` and `tenant="acme-corp"` are provided
- **AND** an app entry has `uri="https://console.reltio.com/?env=${environment}&tenant=${tenant}"`
- **THEN** the rendered link href is `"https://console.reltio.com/?env=us-prod&tenant=acme-corp"`

#### Scenario: Placeholders resolved without provided values

- **WHEN** `env` and `tenant` props are not provided
- **AND** an app entry has `uri="https://console.reltio.com/?env=${environment}&tenant=${tenant}"`
- **THEN** the rendered link href is `"https://console.reltio.com/?env=undefined&tenant=undefined"`

#### Scenario: URI without placeholders

- **WHEN** an app entry has a plain URI without `${environment}` or `${tenant}` placeholders
- **THEN** the URI is used as-is regardless of whether `env` and `tenant` props are provided

### Requirement: Category Grouping

The AppSelector component SHALL group apps by their `category` field using `Object.groupBy`. Each category SHALL be displayed with a labeled Divider as a section header. Categories SHALL appear in the order of their first occurrence in the `apps` array.

#### Scenario: Apps grouped by category

- **WHEN** the apps prop includes apps from multiple categories
- **THEN** apps are visually grouped under their category headers
- **AND** each category header is rendered using the Divider component with the category name as children

#### Scenario: Category order follows apps prop

- **WHEN** the apps prop lists "Agentflow" apps before "Data Cloud" apps
- **THEN** the "Agentflow" section appears above the "Data Cloud" section in the grid

### Requirement: App Item Rendering

Each app item SHALL render as an `<a>` element with `target="_blank"` and `rel="noopener noreferrer"`. It SHALL display the app icon and the app name as a text label below the icon.

#### Scenario: App item with custom icon

- **WHEN** an app entry has an `icon` URL
- **THEN** the icon is displayed as an `<img>` with `src` from the entry's `icon` field

#### Scenario: App item without icon

- **WHEN** an app entry has no `icon`
- **THEN** the Link icon component is rendered as a fallback

#### Scenario: Click opens URL in new tab

- **WHEN** the user clicks an app item
- **THEN** the URL from the entry's `uri` field opens in a new browser tab
- **AND** the `<a>` element has `target="_blank"` and `rel="noopener noreferrer"`

### Requirement: Grid Layout

The AppSelector component SHALL display app items in a CSS Grid with 3 columns by default. The column count SHALL be customizable via the stable CSS class `.reltio_AppSelector_grid`.

#### Scenario: Default 3-column grid

- **WHEN** the app grid is rendered
- **THEN** app items are arranged in a 3-column CSS Grid layout

#### Scenario: Custom columns via stable class

- **WHEN** a consumer overrides `.reltio_AppSelector_grid` with `grid-template-columns: repeat(4, 1fr)`
- **THEN** the grid displays 4 columns instead of 3

### Requirement: Fixed Icon Size

App icons SHALL be rendered at a fixed size of 48×48 pixels with `object-fit: contain`. The icon size SHALL be customizable via the stable CSS class `.reltio_AppSelector_appIcon`.

#### Scenario: Icons render at 48x48

- **WHEN** app items are rendered
- **THEN** each icon element has 48px width and 48px height
- **AND** images use `object-fit: contain` to preserve aspect ratio

#### Scenario: Custom icon size via stable class

- **WHEN** a consumer overrides `.reltio_AppSelector_appIcon` with `width: 64px; height: 64px`
- **THEN** icons render at the custom size

### Requirement: Hover State

App items SHALL display a subtle background highlight with rounded corners on hover.

#### Scenario: Hover highlights app item

- **WHEN** the user hovers over an app item
- **THEN** the item displays a background color using `var(--reltio-color-bg-transparent-1)`
- **AND** the background has rounded corners

### Requirement: HtmlProps and Rest Props

The AppSelector component SHALL use `HtmlProps<"div", CustomProps>` for its props type. All rest props SHALL be spread onto the root wrapper element.

#### Scenario: Custom className applied to root

- **WHEN** a consumer provides a `className` prop
- **THEN** the class is applied to the root element alongside internal classes

#### Scenario: Native HTML attributes forwarded

- **WHEN** a consumer provides `data-testid` or other native attributes
- **THEN** they are spread onto the root wrapper element

### Requirement: Storybook Stories

The AppSelector component SHALL have Storybook stories demonstrating its usage. Stories SHALL use the autodocs tag and pass `cssClasses` via `parameters.cssClasses`.

#### Scenario: Default story shows app grid

- **WHEN** viewing the Default story in Storybook
- **THEN** the AppSelector trigger is visible
- **AND** clicking it opens the popover with grouped app items

#### Scenario: UriTemplates story demonstrates template resolution

- **WHEN** viewing the UriTemplates story in Storybook
- **THEN** the apps have URIs with `${environment}` and `${tenant}` placeholders resolved using provided prop values

#### Scenario: OptionalFields story demonstrates defaults

- **WHEN** viewing the OptionalFields story in Storybook
- **THEN** apps without `icon` show the Link fallback icon
- **AND** apps without `category` appear under "Applications"
- **AND** entries missing `name` or `uri` are not rendered

#### Scenario: CSS classes documented

- **WHEN** viewing the AppSelector docs page
- **THEN** the CSS Classes table shows available stable classes for customization
