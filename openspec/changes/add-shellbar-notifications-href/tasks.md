## 1. Types

- [ ] 1.1 Add `notificationsHref?: string` to `ShellBarProps` in `components/ShellBar/ShellBar.types.ts`, with JSDoc explaining the helper semantics and override precedence (`onNotificationsClick`, `showNotifications`, `notificationsCount`).

## 2. Implementation

- [ ] 2.1 In `components/ShellBar/ShellBar.tsx`, extract `notificationsHref` from props (alongside the existing `logo`, `className`, `...rest`).
- [ ] 2.2 Derive `showNotifications` and `onNotificationsClick` from `notificationsHref` when not supplied by the consumer; pass the resolved values to the underlying UI5 `ShellBar`. Treat empty string `notificationsHref=""` as if absent.
- [ ] 2.3 Ensure `notificationsCount` is NOT derived from `notificationsHref` — it passes through 1:1 from the consumer.

## 3. Documentation

- [ ] 3.1 Update `components/ShellBar/README.md` with a new `### Notifications` section documenting the helper, the override precedence, the `_blank`+`noopener,noreferrer` semantics, and the migration snippet.
- [ ] 3.2 Add a `WithNotificationsHref` story to `components/ShellBar/ShellBar.stories.tsx` showing the icon + click behavior (use the `storybook/test` `fn()` helper for the implicit handler if needed).

## 4. Build and verify

- [ ] 4.1 Run `npm run build-component-docs` to regenerate `ShellBar.story.mdx` and `ShellBar.schema.json` with the new prop.
- [ ] 4.2 Run `npm run format && npm run lint` — both must pass with no errors.
- [ ] 4.3 Visually verify in Storybook (`npm run dev`): the new story renders, clicking the bell opens a new tab pointed at the href.

## 5. Release

- [ ] 5.1 Add a changeset under `.changeset/` (minor bump of `@reltio/design`) noting the new `notificationsHref` prop and the override precedence.
