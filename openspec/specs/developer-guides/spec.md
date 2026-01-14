# Developer Guides Specification

## Purpose

The Developer Guides capability provides documentation for developers and stakeholders to understand workflows, best practices, and processes used in the Reltio Design System. Guides are viewable in Storybook and focus on practical, actionable information.

## Requirements

### Requirement: Guides Directory Structure

The project SHALL provide a `/guides` directory at the project root for developer documentation files. Guide files SHALL use the `.story.mdx` extension to enable Storybook integration.

#### Scenario: Guide file discovery

- **WHEN** a developer creates a file in `/guides` with `.story.mdx` extension
- **THEN** Storybook SHALL automatically include it in the documentation sidebar

### Requirement: Spec-Driven Development Guide

The project SHALL provide a comprehensive guide explaining the spec-driven development workflow with Cursor IDE integration. The guide SHALL be accessible in Storybook under the "Guides" section.

#### Scenario: New developer onboarding

- **WHEN** a new developer joins the project
- **THEN** they SHALL find a guide explaining the OpenSpec workflow
- **AND** the guide SHALL include step-by-step instructions for creating proposals using Cursor IDE

#### Scenario: Stakeholder visibility

- **WHEN** a stakeholder reviews the Storybook documentation
- **THEN** they SHALL find a "Business Value" section explaining the benefits of spec-driven development
- **AND** the section SHALL explain risk reduction, predictability, and quality improvements

### Requirement: Cursor IDE Integration Documentation

The guide SHALL focus on Cursor IDE integration as the primary method of working with OpenSpec. The guide SHALL document the `/openspec-proposal`, `/openspec-apply`, and `/openspec-archive` Cursor commands.

#### Scenario: Cursor command discovery

- **WHEN** a developer reads the guide
- **THEN** they SHALL find documentation for the `/openspec-proposal` command
- **AND** they SHALL find documentation for the `/openspec-apply` command
- **AND** they SHALL find documentation for the `/openspec-archive` command
- **AND** the documentation SHALL explain when to use each command

#### Scenario: AI-assisted workflow

- **WHEN** a developer follows the guide
- **THEN** they SHALL understand how to collaborate with AI assistants in Cursor
- **AND** they SHALL understand the review and approval process for AI-generated proposals

### Requirement: Archive as Project Changelog

The guide SHALL explain that the spec archive (`openspec/changes/archive/`) serves as the project changelog. Developers SHALL understand that archiving completed changes creates a historical record of all project changes.

#### Scenario: Changelog understanding

- **WHEN** a developer reads the guide
- **THEN** they SHALL understand that archived changes form the project changelog
- **AND** they SHALL understand how to browse the archive to see project history

### Requirement: Guide Content Structure

Each developer guide SHALL include the following sections:
- Introduction explaining the concept
- Business value for stakeholders (when applicable)
- Step-by-step workflow or instructions
- Cursor IDE integration (when applicable)
- Best practices
- Troubleshooting (when applicable)

#### Scenario: Complete guide structure

- **WHEN** a developer reads the spec-driven development guide
- **THEN** they SHALL find sections for introduction, business value, workflow, Cursor IDE integration, best practices, and troubleshooting

### Requirement: Storybook Configuration for Guides

Storybook configuration SHALL include the `/guides` directory in the stories array to enable automatic guide discovery.

#### Scenario: Storybook includes guides

- **WHEN** Storybook is started with `npm run dev`
- **THEN** guides from the `/guides` directory SHALL appear in the sidebar navigation

### Requirement: Guide Styling and Readability

Guides SHALL be styled for optimal readability with clear typography, proper heading hierarchy, and visual separation between sections.

#### Scenario: Readable documentation

- **WHEN** a user views a guide in Storybook
- **THEN** the content SHALL be well-formatted with clear headings and readable text
- **AND** code examples SHALL be properly highlighted
