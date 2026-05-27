## ADDED Requirements

### Requirement: notificationsHref helper prop

The `ShellBar` component SHALL accept an optional `notificationsHref?: string` prop. When `notificationsHref` is a non-empty string AND no explicit `onNotificationsClick` is supplied, the wrapper SHALL pass an `onNotificationsClick` handler to the underlying UI5 ShellBar that opens the URL via `window.open(notificationsHref, "_blank", "noopener,noreferrer")`. When `notificationsHref` is a non-empty string AND no explicit `showNotifications` is supplied, the wrapper SHALL pass `showNotifications={true}` to the underlying UI5 ShellBar. The wrapper SHALL NOT derive `notificationsCount` from `notificationsHref`; the bell renders without a badge unless `notificationsCount` is supplied independently.

#### Scenario: Helper enables and wires the notifications icon

- **WHEN** the component is rendered with `notificationsHref="https://example.com/notifications"` and neither `showNotifications` nor `onNotificationsClick` is supplied
- **THEN** the underlying UI5 ShellBar receives `showNotifications={true}` and an `onNotificationsClick` handler that, when invoked, calls `window.open("https://example.com/notifications", "_blank", "noopener,noreferrer")`

#### Scenario: Empty href is treated as absent

- **WHEN** the component is rendered with `notificationsHref=""` (empty string) and neither `showNotifications` nor `onNotificationsClick` is supplied
- **THEN** the underlying UI5 ShellBar receives no derived `showNotifications` or `onNotificationsClick`; the bell is hidden (UI5 default)

#### Scenario: Explicit onNotificationsClick overrides the helper

- **WHEN** the component is rendered with `notificationsHref="https://example.com/notifications"` AND `onNotificationsClick={customHandler}`
- **THEN** the underlying UI5 ShellBar receives `customHandler` as `onNotificationsClick`; the helper's `window.open` handler is NOT used

#### Scenario: Explicit showNotifications={false} overrides the helper

- **WHEN** the component is rendered with `notificationsHref="https://example.com/notifications"` AND `showNotifications={false}`
- **THEN** the underlying UI5 ShellBar receives `showNotifications={false}`; the bell is hidden

#### Scenario: notificationsCount is independent

- **WHEN** the component is rendered with `notificationsHref="https://example.com/notifications"` AND `notificationsCount="3"`
- **THEN** the underlying UI5 ShellBar receives `notificationsCount="3"`; the badge renders with "3"

#### Scenario: notificationsCount without notificationsHref renders no helper handler

- **WHEN** the component is rendered with `notificationsCount="3"` AND `showNotifications={true}` AND no `notificationsHref`
- **THEN** the underlying UI5 ShellBar receives the explicit props unchanged; the helper does NOT inject an `onNotificationsClick`
