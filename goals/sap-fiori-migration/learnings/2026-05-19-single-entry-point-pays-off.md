---
title: "Single-entry-point architecture pays off early"
date: 2026-05-19
---

# Single-entry-point architecture pays off early

Pinning `@ui5/webcomponents-react@2.21.3` inside `@reltio/design` and exposing only subpath exports (`/components`, `/charts`, `/hooks`, `/utils`) means apps can never reach into the underlying UI5 stack directly. The dependency graph stays flat from the app's perspective: one package, one version, controlled by the CoE.

This will become essential when 16 apps need to upgrade in lockstep — instead of 16 separate UI5 migrations, the CoE ships one `@reltio/design` release with a migration MDX and Chromatic-gated visual baselines, and every app inherits the change.
