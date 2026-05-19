---
title: "Only ~26% of UI5 component surface currently endorsed"
date: 2026-05-19
severity: "medium"
---

# Only ~26% of UI5 component surface currently endorsed

`@reltio/design/components` re-exports 42 of the ~163 components available in `@ui5/webcomponents-react`. Apps that need a component outside the endorsed set are blocked — they cannot install `@ui5/webcomponents-react` directly (that contract is enforced platform-wide), so they have to open a request and wait for an endorsement release.

For early pilots this is manageable. As more apps migrate, the rate of "needed component is not endorsed" findings will spike, and a slow CoE response becomes a hard migration blocker.

## Mitigation

- Maintain a public backlog of UI5 components requested by app teams; prioritise based on number of apps blocked
- Run a periodic batch-endorsement sprint each release cycle — endorsing a documentation-only component is fast (README + types re-export + stories), no runtime code required
- Encourage app teams to file requests via PR (just adding the `components/<UI5Name>/` directory with stub stories) so the CoE only has to review and merge, not build
- Track endorsement coverage as a goal metric once the metrics workstream lands
