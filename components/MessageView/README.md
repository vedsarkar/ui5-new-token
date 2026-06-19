# MessageView

`MessageView` is the SAP Fiori message view, re-exported from `@ui5/webcomponents-react/MessageView` as the canonical Reltio entry point. Use it to present a list of messages — validation results, data-quality findings, processing warnings — grouped by severity, each expandable to a details page. It is typically shown in a popover opened from a `MessageViewButton`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/MessageView`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Composition

- **`MessageItem`** — one message: `titleText`, `subtitleText`, `type` (`Negative`, `Critical`, `Positive`, `Information`), `counter`, `groupName`, and children for the details page body.
- **`groupItems`** — group messages by `groupName`.
- **`MessageViewButton`** — a trailing button that shows the aggregate count/severity and opens the view (place it in a footer or toolbar).
- **`navigateBack`** — handler for returning from a message's details page to the list.

### When to use `MessageView` vs `MessageStrip` vs `MessageBox`

- **`MessageView`** — many messages browsed in one place.
- **`MessageStrip`** — a single inline message about the page or an action.
- **`MessageBox`** — a modal prompt requiring acknowledgement or a decision.

### See also

- [UI5 MessageView reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/data-display-messageview--docs) — full underlying API
- `MessageBox` — modal messages · `MessageStrip` — inline messages
