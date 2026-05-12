# Reltio Design Platform

Reltio Design Platform is the UI development, testing, and documentation ecosystem for the Reltio MDM product suite. It builds on the SAP Fiori design system (Horizon visual theme) and is delivered to apps as a single npm package — **`@reltio/design`** — which re-exports a curated set of [`@ui5/webcomponents-react`](https://sap.github.io/ui5-webcomponents-react/) components alongside Reltio MDM business components, charts, hooks, and utilities. UI5 itself is a transitive, pinned dependency: apps install `@reltio/design` and never touch `@ui5/*` directly.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [For Developers](#for-developers)
- [For Designers](#for-designers)
- [Project Structure](#project-structure)
- [Component Development](#component-development)
- [Storybook](#storybook)
- [Scripts](#scripts)
- [Code Style](#code-style)
- [Visual Testing](#visual-testing)
- [Contributing](#contributing)
- [AI Agent Integration](#ai-agent-integration)

## About the Project

Reltio Design Platform provides:

- 📦 **Single distribution package** — `@reltio/design` is the only thing apps install. Re-exports endorsed UI5 components (Button, Avatar, Dialog, MessageStrip, Popover, ...) plus all Reltio MDM components.
- 🔒 **Pinned UI5 version** — `@ui5/webcomponents-react` is a transitive dependency at an exact version the UI Center of Excellence has run through Chromatic visual regression, accessibility, and interaction tests. Apps inherit the tested version automatically.
- 🎯 **MDM business components** — Reltio-specific compositions on top of UI5 (Chat, AppSelector, Markdown, Details, ...)
- 📊 **Charts** — ECharts-based visualizations under `charts/`
- 🎨 **SAP Horizon design tokens** — generated into static `public/variables.css`, `public/fonts.css`, `public/fonts/*.woff2`; consumed via the `data-theme` attribute
- 📚 **Storybook documentation** — stories double as visual tests, accessibility checks, and live API references
- 🔌 **MCP-ready** — every component, story, and design token is discoverable by AI agents through the Reltio Design MCP server

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Reltio MDM apps & partners                                  │
│   import { Button, Chat, MessageStrip, ... }                 │
│     from "@reltio/design/components";                        │
└──────────────────────────────────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  @reltio/design — single endorsed entry point                │
│   • Reltio MDM components (Chat, AppSelector, Details, ...)  │
│   • Reltio primitives (Markdown, Skeleton, ErrorBoundary)    │
│   • Charts (ECharts)                                         │
│   • Hooks & Reltio API utilities                             │
│   • Re-exports of endorsed UI5 components, pinned version    │
└─────────────────────────────┬────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  @ui5/webcomponents-react @ 2.21.3 (pinned, transitive)      │
│   Apps never install this directly. CoE upgrades via         │
│   `@reltio/design` releases after Chromatic + a11y tests.    │
└─────────────────────────────┬────────────────────────────────┘
                              ▲
┌─────────────────────────────┴────────────────────────────────┐
│  SAP Horizon foundation                                      │
│   https://reltio.design/variables.css                        │
│   https://reltio.design/fonts.css                            │
│   data-theme attribute                                       │
└──────────────────────────────────────────────────────────────┘
```

> **Compose, don't reinvent.** If `@reltio/design` already re-exports a UI5 component that fits, use it directly. Build a Reltio component only when there is real MDM business value to add. See the [UI Architecture guide](/?path=/docs/guides-ui-architecture--docs) for the full rationale on why everything goes through a single entry point.

## Getting Started

### Requirements

- Node.js LTS
- npm

### Installation

```bash
git clone git@bitbucket.org:reltio-ondemand/reltio-design.git
cd reltio-design
npm install
```

### Running Storybook

```bash
npm run dev
```

Storybook will be available at: http://localhost:6006

## For Developers

### Loading the design tokens

Load the platform's static CSS files in `<head>` and set the `data-theme` attribute on any ancestor element:

```html
<link rel="stylesheet" href="https://reltio.design/variables.css" />
<link rel="stylesheet" href="https://reltio.design/fonts.css" />

<div data-theme="horizon-light">
  <!-- UI5 components and Reltio components both read the active theme here -->
</div>
```

Switch the theme by toggling `data-theme="horizon-light"` or `data-theme="horizon-dark"` on any ancestor element. Nested theming is supported.

### Using endorsed UI5 components

Endorsed SAP Fiori components are re-exported from `@reltio/design/components` — that's where you import them from in app code. No need to install `@ui5/webcomponents-react` yourself; it arrives transitively at the version the CoE has tested.

```tsx
import { Button, Icon } from "@reltio/design/components";
import "@ui5/webcomponents-icons/dist/save.js";

function SaveBar() {
  return (
    <Button design="Emphasized" icon="save">
      Save
    </Button>
  );
}
```

> **Always include the `/components` subpath.** The published package exposes only subpath entries (`/components`, `/charts`, `/hooks`, `/utils`) — a bare `from "@reltio/design"` has no `main`/`exports` target and breaks at install time.

If a UI5 component you need is not yet re-exported from `@reltio/design/components`, open an issue with the CoE so it can be added — do not work around the contract by installing `@ui5/webcomponents-react` directly. Read why in the [UI Architecture guide](/?path=/docs/guides-ui-architecture--docs).

### Using Reltio MDM components

Reltio components live behind the same subpath — same import:

```tsx
import { Chat, Markdown, Details, AppSelector } from "@reltio/design/components";

function AssistantPanel({ messages }) {
  return <Chat messages={messages} />;
}
```

### Types and Interfaces

All Reltio components are typed with TypeScript. Types are exported alongside components:

```tsx
import { Chat, type ChatProps } from "@reltio/design/components";
```

## For Designers

### Viewing components

1. Start Storybook: `npm run dev`
2. Open http://localhost:6006
3. Browse the **Welcome**, **Design Tokens**, **Guides**, and **Components** sections
4. Use the theme toolbar (top right) to preview every story under `horizon-light` and `horizon-dark`

### Working with design mockups

When designing for Reltio:

1. Use the official [SAP Fiori UI Kit](https://www.sap.com/design-system/fiori-design-web/resources/libraries/) for base components
2. Reuse Reltio business components (Storybook → Components) for MDM patterns
3. Reference colors only through SAP Figma variables — they map 1:1 to `--sap*` CSS tokens at build time
4. Verify the design under both themes before handoff

## Project Structure

```
reltio-design/
├── components/         # Reltio business components & primitives (built on UI5)
├── charts/             # ECharts-based chart components
├── hooks/              # Reusable React hooks
├── openApi/            # Reltio API specs and stories
├── utils/              # Shared utilities (classNames, types, ...)
├── public/             # Static assets — variables.css, fonts.css, fonts/, images
├── scripts/            # Build scripts (tokens, API docs, css)
├── tokens/             # Source token files (generated by build-tokens)
├── guides/             # Storybook MDX guides
├── .storybook/         # Storybook configuration
├── openspec/           # Spec-driven development workflow config
└── package.json
```

## Component Development

### Creating a new Reltio component

> **Step 0 — check `@reltio/design` first.** Before creating anything here, check whether the package already re-exports a UI5 component that fits the design (browse Storybook → Components, or use the [Reltio Design MCP](/?path=/docs/guides-reltio-design-mcp--docs)). If yes, just import it. If a UI5 component you need is not yet re-exported, open an issue with the CoE so it gets endorsed. Wrap only when there is real MDM/business value to add (entity profile, match group, source priority, MDM workflow, …).

1. **Create the component directory:**

```bash
mkdir -p components/MyComponent
```

2. **Create component files (mandatory structure):**

- `MyComponent.tsx` — implementation
- `MyComponent.types.ts` — types (separate file is required)
- `MyComponent.module.css` — CSS Modules styles
- `MyComponent.stories.tsx` — Storybook stories
- `index.ts` — public API

3. **Example — wrapping a UI5 Button with MDM logic:**

`MyComponent.types.ts`:
```ts
import type { ComponentPropsWithoutRef } from "react";
import type { Button } from "@ui5/webcomponents-react/Button";

type Ui5ButtonProps = ComponentPropsWithoutRef<typeof Button>;

export type SaveEntityButtonProps = Omit<Ui5ButtonProps, "design" | "onClick"> & {
  entityId: string;
  onSaved?: (entityId: string) => void;
};
```

`MyComponent.tsx`:
```tsx
import { Button } from "@ui5/webcomponents-react/Button";
import { classNames } from "@/utils/classNames";
import styles from "./SaveEntityButton.module.css";
import type { SaveEntityButtonProps } from "./SaveEntityButton.types";

export const SaveEntityButton = ({
  entityId,
  onSaved,
  className,
  ...rest
}: SaveEntityButtonProps) => {
  return (
    <Button
      design="Emphasized"
      className={classNames(styles.root, className)}
      onClick={() => onSaved?.(entityId)}
      {...rest}
    />
  );
};
```

`index.ts`:
```ts
export { SaveEntityButton } from "./SaveEntityButton";
export type { SaveEntityButtonProps } from "./SaveEntityButton.types";
```

### Styling

- Use **CSS Modules** for style isolation
- Always wrap class names with `classNames()` from `@/utils/classNames`
- Use SAP Horizon `--sap*` tokens for colors — never hardcode hex values
- Use plain values for sizing, spacing, and typography
- Restyle UI5 components by overriding `--sap*` tokens (preferred) or via `::part()` selectors

## Storybook

Storybook is the single workspace for components, design tokens, guides, and API documentation:

- **Canvas** — interactive component development
- **Docs** — auto-generated documentation per component
- **Controls** — live prop modification
- **Theme toolbar** — switch between `horizon-light` and `horizon-dark`

### Adding stories

Stories describe distinct visual states (one variant per story):

```tsx
export const Default = {
  args: { messages: sampleMessages },
};

export const Thinking = {
  args: { messages: sampleMessages, thinking: true },
};
```

## Scripts

```bash
npm run dev               # Run Storybook in development mode
npm run build-storybook   # Build Storybook for production
npm run build-tokens      # Regenerate variables.css, fonts.css, fonts/ from @sap-theming/theming-base-content
npm run lint              # Check code with Biome
npm run format            # Format code with Biome
npm run test              # Run Vitest tests
npm run coverage          # Run tests with coverage
npm run deploy            # Deploy to Chromatic for visual testing
```

## Code Style

The project uses **Biome** for linting and formatting.

- Tabs for indentation
- Double quotes for strings
- Auto-organized imports

```bash
npm run format   # auto-fix formatting
npm run lint     # check without fixes
```

## Visual Testing

The project uses **Chromatic** for visual regression testing. Every story is captured under both `horizon-light` and `horizon-dark`.

```bash
npm run deploy
```

## Contributing

### Development Process

1. **Check UI5 first** — confirm there is no existing component that fits the design
2. **Create a branch** for the new feature or fix
3. **Develop the component** following the structure under `components/`
4. **Add stories** to Storybook for all variants
5. **Format and lint** — `npm run format`, `npm run lint`
6. **Open a Pull Request** with a description of changes

### Pre-PR Checklist

- [ ] UI5 components used directly when possible; Reltio wrappers only for real MDM/business value
- [ ] Code follows project structure (`.tsx` + `.types.ts` + `.module.css` + `.stories.tsx` + `index.ts`)
- [ ] Stories added/updated in Storybook (one variant per story)
- [ ] Component verified under both `horizon-light` and `horizon-dark`
- [ ] No hardcoded hex colors — all colors reference `--sap*` tokens
- [ ] `npm run format` executed
- [ ] `npm run lint` passes

## AI Agent Integration

This project is equipped with MCP (Model Context Protocol) servers for AI-assisted development.

### MCP Servers

| Server | URL | Purpose |
|--------|-----|---------|
| **Reltio Design MCP** | `http://localhost:6006/mcp` | Component docs, stories, API references (powered by Storybook MCP) |
| **Atlassian MCP** | `https://mcp.atlassian.com/v1/mcp/authv2` | Jira and Confluence access |
| **Figma MCP** | `https://mcp.figma.com/mcp` | Design context from Reltio Design System |

### Setup for AI Agents

1. **Reltio Design MCP** — start `npm run dev` BEFORE launching a Claude Code session (the MCP server is served by Storybook; MCP servers connect at session startup)
2. **Atlassian MCP** — requires OAuth authorization per developer on first use
3. **Figma MCP** — requires one-time OAuth authorization per developer:
   - The `figma@claude-plugins-official` plugin is pre-configured in `.claude/settings.json`
   - On first use, Claude Code will open browser for Figma OAuth login

### Remote MCP (for external consumers)

The published Reltio Design MCP is available at `https://reltio.design/mcp` for use in downstream application repositories and third-party AI agents.

## Useful Links

- [UI5 Web Components React](https://sap.github.io/ui5-webcomponents-react/)
- [UI5 Web Components Icons](https://sap.github.io/ui5-webcomponents/) — see the "Icons Explorer"
- [SAP Design System](https://www.sap.com/design-system/) — semantic guidance for SAP Fiori (Horizon theme)
- [SAP/theming-base-content](https://github.com/SAP/theming-base-content) — source of the `--sap*` tokens
- [Storybook Documentation](https://storybook.js.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Biome Documentation](https://biomejs.dev)
- [Chromatic Documentation](https://www.chromatic.com/docs)

## License

Licensed under the [Apache License, Version 2.0](LICENSE). See [`NOTICE`](NOTICE) for attribution of the upstream Apache 2.0 software this platform redistributes — most notably `@ui5/webcomponents-react` and `@sap-theming/theming-base-content` from SAP SE.

## Contact

- **Repository**: [Bitbucket](https://bitbucket.org/reltio-ondemand/reltio-design)
- **Issues**: [Bitbucket Issues](https://bitbucket.org/reltio-ondemand/reltio-design/issues)
