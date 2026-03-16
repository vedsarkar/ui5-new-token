## ADDED Requirements

### Requirement: Component Structure

The AppSelector component SHALL follow the mandatory component structure with `AppSelector.tsx`, `AppSelector.types.ts`, `AppSelector.module.css`, `AppSelector.stories.tsx`, and `index.ts`. It SHALL be located at `components/AppSelector/`.

#### Scenario: Component files exist

- **WHEN** the AppSelector component is created
- **THEN** all required files exist in `components/AppSelector/`
- **AND** the public API is exported through `index.ts`

### Requirement: Self-Contained Popover

The AppSelector component SHALL render both a trigger button and a Popover. The trigger SHALL be a button containing the applications icon SVG (`/icons/applications.svg` from the icon system). The Popover SHALL contain the app grid content.

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

### Requirement: Type-Safe Apps Prop

The AppSelector component SHALL accept an `apps` prop of type `AppEntry[]` where `AppEntry = { name: AppName; uri: string }` and `AppName` is a union type derived from the `name` fields of `public/apps/catalog.json`. The list of available apps and their URIs for a given tenant can be retrieved from Reltio Config Service. Extra fields beyond `name` and `uri` are accepted by TypeScript's structural typing, allowing Config Service responses to be passed directly.

#### Scenario: Valid app names accepted

- **WHEN** a consumer provides `apps={[{ name: "Hub", uri: "/hub" }, { name: "RDM", uri: "/rdm" }]}`
- **THEN** TypeScript accepts the prop without errors
- **AND** only the specified apps are displayed in the grid

#### Scenario: Invalid app name causes TypeScript error

- **WHEN** a consumer provides `apps={[{ name: "unknown-app", uri: "/foo" }]}`
- **THEN** TypeScript reports a compile-time error that `"unknown-app"` is not assignable to `AppName`

#### Scenario: Unknown app names silently ignored at runtime

- **WHEN** the apps prop contains a name not present in the fetched catalog
- **THEN** that entry is silently ignored
- **AND** no runtime error is thrown

#### Scenario: Extra fields from Config Service accepted

- **WHEN** a consumer passes objects with additional fields (e.g. from Config Service) like `{ name: "Hub", uri: "/hub", tenant: "t1" }`
- **THEN** TypeScript accepts the prop without errors (structural typing)
- **AND** extra fields are silently ignored by the component

### Requirement: Remote Catalog Fetching

The AppSelector component SHALL fetch app metadata from `https://reltio.design/apps/catalog.json` when the popover is first opened. The fetch SHALL NOT occur on component mount — only on popover open.

#### Scenario: Catalog fetched on first open

- **WHEN** the popover is opened for the first time
- **THEN** a fetch request is made to `https://reltio.design/apps/catalog.json`
- **AND** a loading state is shown while the fetch is in progress

#### Scenario: No fetch on mount

- **WHEN** the AppSelector component is rendered but the popover is not opened
- **THEN** no network request to the catalog URL is made

### Requirement: Module-Level Cache

The AppSelector component SHALL use a module-level cached Promise for the catalog data. Once fetched successfully, subsequent popover opens SHALL resolve instantly from the cache without showing a loading state.

#### Scenario: Second open resolves from cache

- **WHEN** the popover is opened a second time after a successful fetch
- **THEN** the app grid appears immediately without a loading skeleton
- **AND** no additional network request is made

#### Scenario: Cache cleared on error

- **WHEN** the catalog fetch fails
- **THEN** the cached Promise is cleared
- **AND** the next popover open retries the network request

### Requirement: Loading State

The AppSelector component SHALL display a Skeleton loading placeholder while the catalog is being fetched.

#### Scenario: Skeleton shown during fetch

- **WHEN** the popover is opened and the catalog is being fetched
- **THEN** the Skeleton component is rendered inside the popover
- **AND** the skeleton approximates the layout of the app grid

### Requirement: Error Handling with Retry

When the remote catalog fetch fails, the AppSelector component SHALL display an ErrorMessage and automatically retry every 3 seconds while the popover remains open. The retry timer SHALL be cleared when the popover is closed.

#### Scenario: Error message on network failure

- **WHEN** the fetch to `https://reltio.design/apps/catalog.json` fails
- **THEN** an ErrorMessage is displayed within the popover content with the text "Could not load the app catalog. Retrying…"
- **AND** the loading skeleton remains visible

#### Scenario: Automatic retry while popover is open

- **WHEN** the catalog fetch fails and the popover is still open
- **THEN** the component retries the fetch after 3 seconds
- **AND** continues retrying until the fetch succeeds or the popover is closed

#### Scenario: Retry timer cleared on popover close

- **WHEN** the popover is closed while a retry is pending
- **THEN** the retry timer is cleared
- **AND** no further fetch attempts are made

### Requirement: Category Grouping

The AppSelector component SHALL group apps by their `category` field from the catalog. Each category SHALL be displayed with a labeled Divider as a section header. Categories SHALL appear in the order of their first occurrence in the catalog's `apps` array. Only categories containing at least one enabled app (present in the `apps` prop) SHALL be shown.

#### Scenario: Apps grouped by category

- **WHEN** the apps prop includes apps from multiple categories
- **THEN** apps are visually grouped under their category headers
- **AND** each category header is rendered using the Divider component with the category name as children

#### Scenario: Empty categories hidden

- **WHEN** no apps from a given category are included in the apps prop
- **THEN** that category header and section are not rendered

#### Scenario: Category order follows catalog

- **WHEN** the catalog lists "Agentflow" apps before "Data Cloud" apps
- **THEN** the "Agentflow" section appears above the "Data Cloud" section in the grid

### Requirement: App Item Rendering

Each app item SHALL render as an `<a>` element with `target="_blank"` and `rel="noopener noreferrer"`. It SHALL display the app icon (as an `<img>` element with the catalog's icon URL) and the app name as a text label below the icon.

#### Scenario: App item displays icon and name

- **WHEN** an app item is rendered
- **THEN** the app icon is displayed as an `<img>` with `src` from the catalog's `icon` field
- **AND** the app name from the catalog's `name` field is displayed below the icon

#### Scenario: Click opens URL in new tab

- **WHEN** the user clicks an app item
- **THEN** the URL from the `apps` prop value opens in a new browser tab
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
- **THEN** each icon `<img>` element has 48px width and 48px height
- **AND** the image uses `object-fit: contain` to preserve aspect ratio

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

#### Scenario: CSS classes documented

- **WHEN** viewing the AppSelector docs page
- **THEN** the CSS Classes table shows available stable classes for customization
