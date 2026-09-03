# Figma Code Connect

Templates that tell Figma which `@reltio/design` component a Figma component maps to, and what the generated snippet should look like. Designers and developers see the snippet in Figma's Dev Mode instead of a guess.

### Why these live here and not beside their components

A `.figma.ts` inside `components/` would be swept up by the package build, and it imports the virtual `figma` module, which only exists inside Figma's template runtime — so the build would fail. Keeping them in one directory also makes the mapped surface easy to audit against the library.

### Format

Every file is a **parserless template**: a `.figma.ts` whose default export uses a `` figma.code`…` `` tagged template. The alternative format — `.figma.tsx` with `figma.connect()` — is published differently and is not what this repo uses. Do not mix them.

The three leading comments matter: `url=` is the Figma node the template binds to, and `source=`/`component=` drive the "open in code" link.

### Mapping rules

Figma properties and code props do not line up one for one, and forcing them is worse than leaving a gap.

- Map a Figma property only when a real counterpart exists on the code component's props. Where none does, **omit it** and say why in a comment — never invent a prop name.
- `getEnum` mappings must list **every** variant value. An unmapped value silently returns `undefined` and produces a broken snippet.
- `Form Factor` is omitted almost everywhere: content density is set on an ancestor, not per component.
- Slots whose Figma property is a plain boolean are emitted as identifiers the developer supplies (`icon={icon}`), not as invented markup. There is no instance to resolve and nothing to copy.

### Checking your work

```bash
npx figma connect publish --dry-run --skip-update-check
```

This parses every template and lists what would be published. It stops at the access token, which is expected locally — publishing happens in CI.

### Publishing

The `Publish Figma Code Connect` step runs on merges to `main` and needs a secured `FIGMA_ACCESS_TOKEN` repository variable with Code Connect write scope. Without one the step logs a skip and passes, so forks and clones are unaffected.

### Watch the curated names

Several endorsed components are **not** 1:1 UI5 re-exports, and a snippet written against UI5's own API will not typecheck:

- `TextArea` is a Reltio component using the platform's `ValueState` union — `Error`/`Warning`/`Success`, where UI5 says `Negative`/`Critical`/`Positive`.
- `TreeItem` drops UI5's `text` in favour of `content`, collapsing the `TreeItem`/`TreeItemCustom` split.
- `ListItem` is UI5's `ListItemStandard` under a curated name.

Read the component's own `.types.ts` rather than UI5's before mapping.

### Coverage

48 components mapped: Avatar, Breadcrumbs, BusyIndicator, Button, Calendar, Card, Carousel, CheckBox, DatePicker, DateTimePicker, Dialog, FileUploader, IllustratedMessage, Input, Label, Link, List, ListItem, Menu, MenuItem, MessageStrip, MultiComboBox, MultiInput, NotificationListItem, Panel, Popover, ProgressIndicator, RadioButton, RatingIndicator, SegmentedButton, Select, ShellBar, SideNavigation, SideNavigationItem, Slider, StepInput, Switch, Tab, TabContainer, Table, Tag, TextArea, TimePicker, Toast, Toolbar, Tree, TreeItem, UserMenu.

Not mapped: `Form` and `ComboBox` (no matching Figma component set was found — Form's page models `FormItem` layouts rather than the Form, and the Combobox page only carries Multi Combobox), `ColorPicker`, and the Reltio business components other than ShellBar, TextArea, TreeItem and UserMenu.

When adding one, take the Figma component's `componentPropertyDefinitions` (its node id goes in the `url=` comment), read the code component's props, and map only the overlap. Verify the property names against Figma rather than guessing them — a wrong `getEnum` key silently yields `undefined`.
