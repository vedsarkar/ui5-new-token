---
"@reltio/design": patch
---

Fix `Skeleton` being invisible in the light theme. The shimmer and base bar both resolved to `--sapBackgroundColor` / `--sapNeutralBackground` (identical `#f5f5fa` in light Horizon), so the loading animation had no contrast. The bars now use a translucent neutral grey that darkens light surfaces and lightens dark ones, keeping the skeleton visible on any background in both themes without being overly prominent.
