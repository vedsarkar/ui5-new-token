# Tasks: Add Spec-Driven Development Guide

## 1. Setup

- [x] 1.1 Create `/guides` directory at project root
- [x] 1.2 Update `.storybook/main.ts` to include `../guides/**/*.story.mdx` in stories array

## 2. Documentation Content

- [x] 2.1 Create `guides/spec-driven-development.story.mdx` with full guide content
  - Introduction section explaining spec-driven development
  - Business Value section for stakeholders
  - Three-Stage Workflow section (Propose → Implement → Archive)
  - **Cursor IDE Integration** section (primary focus)
    - `/openspec-proposal` command usage
    - `/openspec-apply` command usage
    - `/openspec-archive` command usage (project changelog)
    - AI-assisted development workflow
  - Best Practices for AI-assisted development
  - Troubleshooting section

## 3. Storybook Integration

- [x] 3.1 Configure Storybook Meta to place guide in "Guides" section
- [x] 3.2 Add appropriate styling for readability
- [ ] 3.3 Verify guide renders correctly in Storybook (`npm run dev`)

## 4. Validation

- [x] 4.1 Run `npm run format` to ensure code style compliance
- [x] 4.2 Run `npm run lint` to verify no linting errors (pre-existing .vscode issues unrelated)
- [ ] 4.3 Verify guide is accessible and readable in Storybook
- [ ] 4.4 Test navigation to guide from Storybook sidebar

## 5. Finalization

- [x] 5.1 Update specs with the new `developer-guides` capability
- [ ] 5.2 Archive this change proposal
