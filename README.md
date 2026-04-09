# Reltio Design Platform

Reltio Design Platform is a library of components and tools for building consistent user interfaces.

## 📋 Table of Contents

- [About the Project](#about-the-project)
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

## About the Project

Reltio Design Platform provides:

- 🎨 **Reusable Components** — ready-to-use React components with TypeScript
- 📚 **Documentation** — interactive component documentation in Storybook
- 🎯 **Consistency** — unified style and behavior across all products
- 🚀 **Rapid Development** — accelerate UI development with ready-made components

## Getting Started

### Requirements

- Node.js LTS
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@bitbucket.org:reltio-ondemand/reltio-design.git
cd reltio-design

# Install dependencies
npm install
```

### Running Storybook

```bash
npm run dev
```

Storybook will be available at: http://localhost:6006

## For Developers

### Using Components

Components are exported from the `@reltio/design` package. Example usage:

```tsx
import { Button } from "@reltio/design";

function MyComponent() {
	return <Button>Click me</Button>;
}
```

### Component Structure

Each component follows a standard structure:

```
components/
  ComponentName/
    ComponentName.tsx          # Main component
    ComponentName.module.css   # Styles (CSS Modules)
    ComponentName.stories.tsx  # Storybook stories
    index.ts                   # Component export
```

### Types and Interfaces

All components are typed with TypeScript. Types are exported alongside components:

```tsx
import { Button, type ButtonProps } from "@reltio/design";
```

## For Designers

### Viewing Components

1. Start Storybook: `npm run dev`
2. Open http://localhost:6006 in your browser
3. Explore components in the "Components" section
4. Use interactive controls to test different states

### Design System Documentation

Design principles and guidelines are located in the **Documentation/Constitution** section in Storybook.

### Working with Design Mockups

When creating new components or modifying existing ones:

1. Ensure the design aligns with principles from Constitution
2. Verify component accessibility
3. Test various states (hover, focus, disabled, etc.)
4. Ensure responsiveness across different screen sizes

## Project Structure

```
reltio-design/
├── components/           # React components
│   └── Button/          # Example component
├── stories/             # Documentation and examples
│   └── Constitution.mdx # Design system principles
├── .storybook/          # Storybook configuration
├── icons/               # Icons
├── utils/               # Utilities
└── package.json         # Dependencies and scripts
```

## Component Development

### Creating a New Component

1. **Create the component directory:**

```bash
mkdir -p components/MyComponent
```

2. **Create component files:**

- `MyComponent.tsx` — main component
- `MyComponent.module.css` — styles
- `MyComponent.stories.tsx` — Storybook stories
- `index.ts` — component export

3. **Example structure:**

**MyComponent.tsx:**
```tsx
import type React from "react";
import styles from "./MyComponent.module.css";

export type MyComponentProps = {
	children: React.ReactNode;
	// Add other props
};

export const MyComponent = ({ children, ...props }: MyComponentProps) => {
	return (
		<div className={styles.root} {...props}>
			{children}
		</div>
	);
};
```

**MyComponent.module.css:**
```css
.root {
	/* Component styles */
}
```

**MyComponent.stories.tsx:**
```tsx
import { MyComponent } from "./MyComponent";

export default {
	title: "Components/MyComponent",
	component: MyComponent,
	tags: ["autodocs"],
};

export const Default = {
	args: {
		children: "Example",
	},
};
```

**index.ts:**
```tsx
export { MyComponent } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

### Styling

- Use **CSS Modules** for style isolation
- Name classes using BEM methodology (optional)
- Avoid global styles
- Use CSS variables for theming (if applicable)

## Storybook

### Viewing Components

Storybook provides an interactive environment for developing and testing components:

- **Canvas** — interactive component development
- **Docs** — auto-generated documentation
- **Controls** — real-time prop modification
- **Actions** — event tracking

### Adding Stories

Stories describe different component states:

```tsx
export const Primary = {
	args: {
		children: "Primary Button",
	},
};

export const Disabled = {
	args: {
		children: "Disabled Button",
		disabled: true,
	},
};
```

## Scripts

```bash
# Run Storybook in development mode
npm run dev

# Build Storybook for production
npm run build-storybook

# Deploy to Chromatic (visual testing)
npm run deploy

# Check code with linter
npm run lint

# Format code
npm run format
```

## Code Style

The project uses **Biome** for linting and formatting.

### Formatting

```bash
# Automatically format all files
npm run format
```

### Formatting Rules

- Tabs are used for indentation
- Double quotes for strings
- Automatic import organization

### Code Checking

```bash
# Check code without fixes
npm run lint
```

## Visual Testing

The project uses **Chromatic** for visual regression testing:

- Automatic detection of visual changes
- Screenshot comparison between commits
- CI/CD integration

To deploy to Chromatic:

```bash
npm run deploy
```

## Contributing

### Development Process

1. **Create a branch** for a new feature or fix
2. **Develop the component** following the project structure
3. **Add stories** to Storybook for all states
4. **Check code** with `npm run lint`
5. **Format code** with `npm run format`
6. **Create a Pull Request** with a description of changes

### Pre-PR Checklist

- [ ] Code follows project style
- [ ] Stories added/updated in Storybook
- [ ] Component works correctly in all states
- [ ] Component accessibility verified
- [ ] Code formatted (`npm run format`)
- [ ] Linter passes without errors (`npm run lint`)

### Reporting Issues

If you find a bug or want to suggest an improvement, create an issue in [Bitbucket Issues](https://bitbucket.org/reltio-ondemand/reltio-design/issues).

## AI Agent Integration

This project is equipped with MCP (Model Context Protocol) servers for AI-assisted development.

### MCP Servers

| Server | URL | Purpose |
|--------|-----|---------|
| **Storybook MCP** | `http://localhost:6006/mcp` | Component docs, stories, API references |
| **Figma MCP** | `https://mcp.figma.com/mcp` | Design context from Reltio Design System |

### Setup for AI Agents

1. **Storybook MCP** — start `npm run dev` BEFORE launching a Claude Code session (MCP servers connect at session startup)
2. **Figma MCP** — requires one-time OAuth authorization per developer:
   - The `figma@claude-plugins-official` plugin is pre-configured in `.claude/settings.json`
   - On first use, Claude Code will open browser for Figma OAuth login

### Remote MCP (for external consumers)

Published Storybook MCP is available at `https://reltio.design/mcp` for use in downstream application repositories and third-party AI agents.

## Useful Links

- [Storybook Documentation](https://storybook.js.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Biome Documentation](https://biomejs.dev)
- [Chromatic Documentation](https://www.chromatic.com/docs)

## License

ISC

## Contact

- **Repository**: [Bitbucket](https://bitbucket.org/reltio-ondemand/reltio-design)
- **Issues**: [Bitbucket Issues](https://bitbucket.org/reltio-ondemand/reltio-design/issues)
