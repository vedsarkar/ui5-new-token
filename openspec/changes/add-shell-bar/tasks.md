## Tasks

- [ ] **1. Copy SVG assets** — copy `~/Projects/admin-tools/public/ReltioLogo.light.svg` and `ReltioLogo.dark.svg` into `components/ShellBar/assets/`.
- [ ] **2. Scaffold `components/ShellBar/`** with the six files listed in `design.md` (ShellBar.tsx, .types.ts, .module.css, .stories.tsx, README.md, index.ts).
- [ ] **3. Write `ShellBar.types.ts`** — `ShellBarProps = Omit<Ui5ShellBarProps, "branding"> & { branding?: ReactNode; "data-test-id"?: string }`.
- [ ] **4. Write `ShellBar.module.css`** with `.logo` (display flex/inline), `.lightLogo` (default visible), `.darkLogo` (default hidden), and `[data-theme="horizon-dark"]` rules that swap the two. No hex values.
- [ ] **5. Write `ShellBar.tsx`** importing both SVG URLs, defining a `DefaultReltioLogo` component that renders a `<picture>` with both `<img>` elements, and the main `ShellBar` component that uses the default unless `logo` is overridden.
- [ ] **6. Write `ShellBar.stories.tsx`** with stories: default light, default dark (decorator wraps the story in `<div data-theme="horizon-dark">`), custom logo override, with `primaryTitle` + `secondaryTitle`, with `startContent` / `endContent` items.
- [ ] **7. Write `README.md`** — narrative documentation: when to use ShellBar, how the default logo theme-swap works, when to override, accessibility notes (`alt="Reltio"` on the default).
- [ ] **8. Write `index.ts`** exporting `ShellBar` and `ShellBarProps`.
- [ ] **9. Edit `components/index.ts`** — append `export * from "./ShellBar";` to the Reltio business component block.
- [ ] **10. Regenerate docs** — `npm run build-component-docs`.
- [ ] **11. Format and lint** — `npm run format && npm run lint`. Both must finish cleanly.
- [ ] **12. Update the existing changeset** to mention the ShellBar wrapper.
