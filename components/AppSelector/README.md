# AppSelector

`AppSelector` is a thin Reltio business wrapper around the SAP Fiori [`ProductSwitch`](https://ui5.github.io/webcomponents/components/fiori/ProductSwitch/) from `@ui5/webcomponents-react`. It accepts the raw apps list (typically returned by Reltio Config Service) and renders the canonical 3×3 grid trigger button + popover with apps grouped by category. Grid layout, keyboard navigation, focus, hover, and selected state are all inherited from the underlying SAP component — `AppSelector` only adds the three Reltio-specific concerns described below.

### URI templates

Each `app.uri` may contain `${environment}` and `${tenant}` placeholders. The component substitutes them with the values of the `env` / `tenant` props before passing the URL to the underlying link. If a prop is omitted, the placeholder becomes the literal string `"undefined"`.

### Categories

`ProductSwitch` is intentionally a flat grid — SAP does not support category headers inside it. `AppSelector` encodes each app's `category` in the item's `subtitleText` and reorders apps so that entries sharing the same category stay adjacent. Categories appear in the order they first occur in the input array; apps without a `category` fall back to `"Applications"`.

### Optional fields

Apps without `name` or `uri` are silently filtered out — your tenant config may include incomplete entries during rollout, and you should not have to pre-filter the list. `icon` is also optional; when omitted, the item shows UI5's `internet-browser` fallback so the grid stays uniform.

### See also

- [`ProductSwitch` reference](https://ui5.github.io/webcomponents/components/fiori/ProductSwitch/) — layout breakpoints, keyboard navigation, selected state
- [SAP Fiori — Shell Bar](https://www.sap.com/design-system/fiori-design-web/v1-145/ui-elements/shell-bar) — Product Switch slot in the canonical SAP header
