# Change: Add Spec-Driven Development Guide

## Why

Developers joining the project lack a clear, accessible guide explaining the OpenSpec workflow and spec-driven development practices. While `openspec/AGENTS.md` provides instructions for AI assistants, there is no human-friendly documentation that:
- Explains the "why" behind spec-driven development
- Provides step-by-step workflow guidance with Cursor IDE integration
- Communicates business value to stakeholders
- Is easily discoverable in the Storybook documentation

**Strategic context**: Cursor is becoming the corporate IDE for UI development, and we are investing significant resources into AI-assisted development workflows. This guide should reflect that investment by focusing on Cursor integration rather than direct CLI usage.

## What Changes

- **NEW**: Create `/guides` folder for developer documentation
- **NEW**: Add `spec-driven-development.story.mdx` guide viewable in Storybook
- **NEW**: Update Storybook configuration to include guides in navigation
- **NEW**: Add capability spec for developer guides structure

The guide will cover:
1. Introduction to Spec-Driven Development (what and why)
2. Business Value section for stakeholders (risk reduction, predictability, quality)
3. Three-Stage Workflow explanation (Propose → Implement → Archive)
4. **Cursor IDE Integration** — primary focus on:
   - `/openspec-proposal` — creating change proposals
   - `/openspec-apply` — implementing approved changes
   - `/openspec-archive` — archiving completed changes (serves as project changelog)
5. AI-Assisted Development workflow with Cursor
6. Best Practices for working with AI assistants
7. Troubleshooting common issues

## Impact

- **Affected specs**: Creates new `developer-guides` capability
- **Affected code**: 
  - `.storybook/main.ts` - add guides path to stories array
  - `guides/spec-driven-development.story.mdx` - new documentation file
- **User experience**: Guides will appear in Storybook sidebar under "Guides" section
- **Stakeholder visibility**: Business value section explains ROI of spec-driven approach

## Audience

- **New developers**: Step-by-step onboarding to the workflow
- **Experienced developers**: Quick reference for CLI commands and best practices
- **Stakeholders**: Understanding of business value and process benefits
