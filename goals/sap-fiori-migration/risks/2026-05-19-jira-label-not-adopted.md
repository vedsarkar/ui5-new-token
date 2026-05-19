---
title: "fiori-migration Jira label not adopted yet"
date: 2026-05-19
severity: "medium"
---

# fiori-migration Jira label not adopted yet

The goal's JQL (`project = DESIGN AND labels = fiori-migration`) returns 0 issues. Migration tickets exist (DESIGN-50 Modal, DESIGN-57 dark mode, DESIGN-58 streaming hook, DESIGN-61 Popover, DESIGN-74 auth package, etc.) but are not tagged for migration tracking.

Without a consistent label, future goal updates cannot auto-aggregate scope, progress, or completion rate from Jira. The CoE has to maintain a mental model of which DESIGN tickets count toward the migration — error-prone and impossible for partner teams to follow.

## Mitigation

- Agree on a `fiori-migration` label convention with engineering managers and document it in the goal's `DESCRIPTION.md`
- Back-fill the label on existing migration-adjacent tickets in DESIGN (foundation work) and across per-app projects (consumer work)
- Add label enforcement to the PR template for tickets that touch `packages/design/`, `components/`, or `apps/`
