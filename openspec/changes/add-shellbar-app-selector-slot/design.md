## Context

UI5 `ShellBar` exposes slot props for the canonical right cluster: `profile` (Avatar), `searchField`, `startButton`, plus the boolean `showProductSwitch` for SAP's built-in product switch. None of these match the Reltio app-selector: our app-selector is a self-contained component that renders its own `<Button icon="grid">` + `<Popover>` and lives in the right cluster as a `ShellBarItem`-like action.

Today, the consumer wires it via `children`:

```tsx
<ShellBar primaryTitle="Console">
  <AppSelector apps={…} env="…" tenant="…" />
  <ShellBarItem icon="sys-help" text="Help" />
</ShellBar>
```

This is a valid arrangement but mixes "the canonical app-selector slot" with "any extra ShellBarItem actions". The new pattern across Reltio apps is to surface every header concern as a typed slot prop on `ShellBar`, so the API is symmetric and AI agents can generate the canonical header without guessing position-in-children semantics.

This change is one of six `ShellBar`-related changes that together establish a uniform slot-prop API: `notificationsHref`, `appSelector`, `navigationDrawer`, `tenantSelector`, `customerSelector`, `userMenu`. Each is shipped independently as its own minor bump.

## Goals / Non-Goals

**Goals:**

- Make `appSelector` a documented, first-class slot on `ShellBar`.
- Match the slot-prop pattern UI5 uses (`profile`, `searchField`, `startButton`) and that the four sibling changes introduce for the other Reltio sub-components.
- Zero behavior change for consumers that keep passing `<AppSelector>` via `children`.

**Non-Goals:**

- Changing `AppSelector` itself — its API, types, and behavior remain identical.
- Validating that the `appSelector` element is actually `<AppSelector>` at compile time. We type it as `ReactElement`. Consumers technically could pass any component, but the README points to the canonical use.
- Defining the React composition pattern for sub-components (controlled vs uncontrolled, state ownership, etc.). That conversation happens in each sub-component's own change.

## Decisions

### Decision 1 — Slot prop, not children pattern

The `appSelector` prop is rendered into UI5 ShellBar's `children` slot. The wrapper merges it with whatever `children` the consumer also passes:

```tsx
<Ui5ShellBar {…rest}>
  {children}
  {appSelector}
</Ui5ShellBar>
```

**Why:** UI5 ShellBar's `children` slot is the only place where a self-contained `<Button>+<Popover>` Reltio component can be inserted into the right cluster — the typed slot props (`profile`, `searchField`, `startButton`) expect specific UI5 element types and would clone/inject `slot="..."` attributes that break Reltio components. Children is the slot-free path.

**Alternative considered:** use a React Fragment to combine `appSelector` with explicit `children`, OR use the UI5 `content` slot. Rejected — `content` is marked experimental in UI5 2.21 and the team policy is to avoid experimental slots (decided in the exploration phase). The Fragment approach is what we use.

### Decision 2 — Slot rendered AFTER explicit children

When both `children` and `appSelector` are supplied, `appSelector` renders LAST (closer to the profile cluster). This matches the canonical SAP Fiori header where the app-selector sits as the right-most action before the profile area.

**Why:** consistent layout across Reltio apps. Apps that need a different ordering can still skip the slot prop and arrange everything via `children` manually.

### Decision 3 — Typed as ReactElement, not the AppSelectorProps shape

The slot prop is typed as `ReactElement`, not as `ReactElement<AppSelectorProps>`. We don't enforce the element type at the TypeScript level.

**Why:**

- Forward-compat: if a future Reltio app-selector variant ships under a different component name, the slot still works.
- Symmetric with UI5's own slot typings (every UI5 slot is typed loosely — `ReactElement` or `ReactNode`).
- The README points to `<AppSelector>` as the canonical fill, which is enough documentation.

**Alternative considered:** `appSelector?: ReactElement<AppSelectorProps>`. Rejected — too restrictive, breaks if `AppSelectorProps` is generic or if a wrapper component (e.g. `<MyAppSelector>` that internally renders `<AppSelector>`) is the actual JSX element.

## Risks / Trade-offs

- [Risk] A consumer passes BOTH `appSelector={<AppSelector …/>}` AND `<AppSelector>` in `children`. → Mitigation: both render side-by-side; we do not de-duplicate. The README explicitly warns against this and points to the slot prop as the recommended path. A linter rule could enforce this later if it becomes a pattern.
- [Trade-off] We add `appSelector` to `ShellBarProps` instead of teaching consumers to import `<AppSelector>` separately. → Acceptable: the slot prop is sugar; the standalone `AppSelector` export is unchanged and still re-exported from `@reltio/design/components`. Consumers can choose either path.

## Migration Plan

None — purely additive. Existing apps continue to work. Follow-up cleanup PRs (in each app repo) can switch from children to the slot prop:

```diff
- <ShellBar primaryTitle="Console">
-   <AppSelector apps={apps} env={env} tenant={tenant} />
- </ShellBar>
+ <ShellBar primaryTitle="Console" appSelector={<AppSelector apps={apps} env={env} tenant={tenant} />} />
```

## Open Questions

None — the slot is intentionally a thin renaming of the existing children pattern with a typed entry point.
