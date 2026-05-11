/**
 * The single public entry point for every UI surface a Reltio application
 * should consume — the curated set of SAP Fiori (UI5) components endorsed
 * for use in Reltio apps, plus Reltio MDM components and primitives.
 *
 * Apps install only `@reltio/design`. The matching pinned version of
 * `@ui5/webcomponents-react` arrives transitively. Direct imports from
 * `@ui5/*` are discouraged so that the version of UI5 every Reltio
 * application runs against is the one that the UI Center of Excellence
 * has run through Chromatic visual regression, accessibility, and
 * interaction tests as part of every `@reltio/design` release.
 *
 * The endorsed surface is defined once in `components/index.ts` (Reltio
 * MDM components, primitives, and re-exports of endorsed UI5 components).
 * This file only forwards that barrel through to the published package.
 */
export * from "@/components";
