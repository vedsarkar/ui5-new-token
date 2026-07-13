## 1. Shared codegen

- [x] 1.1 Add shared codegen helpers (`scripts/icon-module-codegen.mjs`) for PascalCase export names (`Decline` / `ReltioDataQuality`), props types, and the unified module template used by both generators.

## 2. Extend custom icon generator (`build-icons.mjs`)

- [x] 2.1 Emit `icons/reltio/<kebab-name>.tsx` with `unsafeRegisterIcon` registration **and** a `Reltio*` PascalCase named export rendering `<Icon name="reltio/<kebab-name>" />`.
- [x] 2.2 Aggregate at `icons/reltio/index.ts` (`@reltio/design/icons/reltio`).
- [x] 2.3 Regenerate `icons/icons.stories.tsx`: one CSF story per icon under `Icons/Reltio Icons Catalog`.
- [x] 2.4 Run `npm run build-icons`; commit regenerated `icons/reltio/` output.

## 3. Add SAP icon generator (`build-sap-icons.mjs`)

- [x] 3.1 Create `scripts/build-sap-icons.mjs` — enumerate `node_modules/@ui5/webcomponents-icons/dist/*.js`, skip aggregate bundles.
- [x] 3.2 Emit `icons/sap/<kebab-name>.tsx` per icon: `@ui5/webcomponents-icons` side-effect import + PascalCase export rendering `<Icon name="<kebab-name>" />`.
- [x] 3.3 Add `npm run build-sap-icons`; wire into `predev` and `prebuild-storybook`.
- [x] 3.4 Run `npm run build-sap-icons`; commit generated `icons/sap/` output.

## 4. Package build

- [x] 4.1 `tsc` compiles `icons/reltio/` and `icons/sap/` to `dist/icons/reltio/` and `dist/icons/sap/`.
- [x] 4.2 Smoke-test: `@reltio/design/icons/reltio/data-quality` + `@reltio/design/icons/sap/decline`.

## 5. Storybook

- [x] 5.1 Update `icons/icons.story.mdx` — dual-family import examples under `icons/sap/` and `icons/reltio/`.
- [x] 5.2 Update `components/Icon/Icon.story.mdx` — `@reltio/design/icons/sap/<kebab>` consumer examples.

## 6. Consumer documentation

- [x] 6.1 Rewrite `guides/icon-library.story.mdx` — dual-namespace import paths; SAP names via UI5 Icons explorer.
- [x] 6.2 Update `guides/ui-architecture.story.mdx` icon references.
- [x] 6.3 Update `packages/design/README.md` and root `README.md`.

## 7. Release and verify

- [x] 7.1 Add a **minor** changeset for `@reltio/design`.
- [x] 7.2 Run `npm run format` and `npm run lint`.
- [x] 7.3 Run `npm run test` and `npm run build-storybook`.
- [x] 7.4 Grep docs for consumer-facing `@ui5/webcomponents-icons` import examples in application code.
