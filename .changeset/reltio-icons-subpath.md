---
"@reltio/design": minor
---

Add the Reltio custom icon set (application, entity-type, and product glyphs), registered into UI5's global registry under the `reltio/*` namespace so they work by name in `<Icon name="reltio/<name>" />` and any UI5 `icon` prop. Two import forms, mirroring SAP Fiori icons:

```tsx
// Per icon — tree-shakable, bundles only what you import (recommended)
import "@reltio/design/icons/data-quality";

// Whole set — convenience, registers every icon
import "@reltio/design/icons";

import { Icon } from "@reltio/design/components";
<Icon name="reltio/data-quality" />;
```

The same SVGs are also served as static assets at `https://reltio.design/icons/<name>.svg`. Icons are monochrome and inherit `currentColor`, so they honor `design`/`color` and re-theme in light/dark.
