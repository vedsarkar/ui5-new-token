# AppSelector: Add Label to Trigger Button

## Context

Application developers requested the ability to add a text label to the AppSelector trigger button. Currently the trigger is a `Button variant="text"` with only the `<Applications />` icon and no text. We need to extend the component API to support an optional label.

## Current State

**AppSelector** ([AppSelector.tsx](components/AppSelector/AppSelector.tsx)) is a domain-specific navigation component. It renders a hardcoded trigger:

```tsx
<Popover
  trigger={
    <Button variant="text" aria-label="Applications">
      <Applications />
    </Button>
  }
>
```

**Popover** ([Popover.tsx](components/Popover/Popover.tsx)) accepts `trigger: React.ReactElement` — any React element.

AppSelector is the only Popover consumer in the project.

## Approach Analysis

| Approach | Pros | Cons |
|----------|------|------|
| **`label?: string`** | Simple API, consistent look, solves the request | Text only, no icon/layout customization |
| **`trigger?: ReactElement`** | Maximum flexibility | Boilerplate, lost consistency, AppSelector loses domain identity |
| **`trigger` as render function** | Flexible + component provides icon | Complex API, atypical pattern for the project |
| **`label` + `trigger` combined** | Covers both scenarios | Two ways to do similar thing — confusing |

## Chosen Approach: `label?: string`

**Rationale:**
1. **Solves the actual request** — developers want to add text, not redesign the trigger
2. **YAGNI** — no real use cases for full trigger customization exist yet. If they appear, `trigger` can be added later as a non-breaking change
3. **AppSelector is a domain component** — its trigger should be recognizable (Applications icon). The label complements but doesn't replace it
4. **Minimal API** — one optional prop, self-explanatory without documentation
5. **Consistency** — all consumers get the same trigger appearance

## Implementation Plan

### Files to Modify

1. **[AppSelector.types.ts](components/AppSelector/AppSelector.types.ts)** — add `label?: string` prop
2. **[AppSelector.tsx](components/AppSelector/AppSelector.tsx)** — render label in trigger
3. **[AppSelector.module.css](components/AppSelector/AppSelector.module.css)** — styles for label (if needed)
4. **[AppSelector.stories.tsx](components/AppSelector/AppSelector.stories.tsx)** — add `WithLabel` story

### Implementation Details

**types.ts** — add prop:
```ts
label?: string;
```

**tsx** — destructure `label`, update trigger:
```tsx
<Button variant="text" aria-label={label ?? "Applications"}>
  <Applications />
  {label}
</Button>
```

**css** — may need gap or text styling in the button (depends on how Button handles mixed icon + text children).

**stories** — one new story `WithLabel`:
```tsx
export const WithLabel: Story = {
  args: {
    label: "Applications",
    apps: defaultApps,
  },
};
```

### Verification

1. `npm run dev` → visually check `WithLabel` story via `preview-stories`
2. `npm run lint` — no errors
3. `run-story-tests` — all tests pass
4. Verify default behavior (without label) is unchanged
