---
title: "Spec-driven development via OpenSpec for new components and breaking changes"
date: 2026-05-19
---

# Spec-driven development via OpenSpec for new components and breaking changes

New Reltio business components, breaking API / schema / architecture changes, and performance optimisations that change behaviour go through OpenSpec: `proposal → design → tasks → archive`. The first archived change is `2026-05-14-add-auth-package`.

Skipped for: bug fixes, typos, formatting, comments, non-breaking dependency / configuration changes, and direct usage of a UI5 component without wrapping.

## Rationale

- **Forces explicit design before implementation** for the work that's expensive to undo. A wrong API on a new business component creates migration debt for every app that adopts it; better to discover the wrong shape on paper than in code.
- **Creates a permanent record of "why".** The archived proposal + design + tasks remain in the repo as the canonical justification for a decision. Reviewers six months later get full context.
- **Gives AI agents a structured workflow.** OpenSpec's stage gates (`/opsx:new` → `/opsx:continue` → `/opsx:apply` → `/opsx:archive`) make it possible for agents to drive the implementation step by step, with human review between artefacts.
- **Right-sized friction.** Trivial changes (bug fixes, typos) skip OpenSpec entirely. The cost only kicks in when the change is expensive to undo.
