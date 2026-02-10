# AssistantMessage Component Specification

## Purpose

The AssistantMessage component displays assistant-authored messages in a chat interface with support for both Markdown and MDX formatting, and error states. It provides consistent styling and layout for assistant messages and distinguishes them visually from user messages. Markdown and MDX content are rendered by a single unified markdown renderer component.

## ADDED Requirements

### Requirement: Message Display

The AssistantMessage component SHALL display assistant message content with proper formatting and styling by delegating to the unified markdown renderer component, which supports both Markdown and MDX (including embedded React components).

#### Scenario: Plain text message displays correctly
- **WHEN** message content contains plain text
- **THEN** text is displayed in the assistant message container
- **AND** text is properly formatted and readable
- **AND** styling distinguishes the message as assistant-authored

#### Scenario: Markdown content renders correctly
- **WHEN** message content contains Markdown (headers, lists, links, code, etc.)
- **THEN** the unified renderer is used
- **AND** Markdown features and GFM are supported
- **AND** rendered content is styled within the assistant message container

#### Scenario: MDX content renders correctly
- **WHEN** message content contains MDX (e.g. embedded React components)
- **THEN** the unified renderer is used
- **AND** React components and Markdown within the content are rendered
- **AND** rendered content is styled within the assistant message container

#### Scenario: Empty content handled
- **WHEN** message content is empty string, null, or undefined
- **THEN** component renders empty container or no content area
- **AND** no errors are thrown
- **AND** component remains stable

### Requirement: Renderer Integration

The AssistantMessage component SHALL use the unified markdown renderer component for all message content (Markdown and MDX). It SHALL NOT use separate renderers for different content types.

#### Scenario: All content uses unified renderer
- **WHEN** AssistantMessage has content to render
- **THEN** content is passed to the unified markdown renderer component
- **AND** that component handles parsing, rendering, and error handling for both Markdown and MDX

#### Scenario: Invalid content handled by renderer
- **WHEN** message content is invalid Markdown or MDX
- **THEN** the unified renderer handles the error gracefully (per its spec)
- **AND** AssistantMessage remains stable and parent is not affected

### Requirement: Visual Design

The AssistantMessage component SHALL have distinct visual styling that identifies messages as assistant-authored, with appropriate layout and spacing.

#### Scenario: Assistant message styling
- **WHEN** AssistantMessage is rendered
- **THEN** message has distinct background and/or styling
- **AND** message is visually distinct from user messages
- **AND** message has appropriate padding and border-radius

#### Scenario: Content area styling
- **WHEN** AssistantMessage is rendered with content
- **THEN** content area has proper spacing
- **AND** text is readable with appropriate contrast
- **AND** Markdown/MDX elements are styled (via renderers and cascade)

### Requirement: CSS Custom Properties

The AssistantMessage component SHALL define design tokens as CSS custom properties on the root element, with `--reltio-assistant-message-` prefix and fallback values. External customization via style prop or overrides SHALL be supported (e.g. `--reltio-assistant-message-background`).

#### Scenario: CSS variables on root
- **WHEN** AssistantMessage is rendered
- **THEN** design tokens are defined on the root element with `--reltio-assistant-message-` prefix
- **AND** developer may override via style prop (e.g. `--reltio-assistant-message-background`)

### Requirement: className and TypeScript

The AssistantMessage component SHALL use the classNames utility for all className composition and SHALL be fully typed in TypeScript (strict mode). Types SHALL live in AssistantMessage.types.ts using the `type` keyword. AssistantMessageProps SHALL be exported. Props SHALL include content, error, errorMessage, className, style, and rest div props as appropriate.

#### Scenario: classNames and types
- **WHEN** developer uses AssistantMessage
- **THEN** root element classNames are composed via classNames utility
- **AND** AssistantMessageProps is exported and usable

### Requirement: Storybook Documentation

The AssistantMessage component SHALL have Storybook stories that demonstrate one variant per story: plain text, Markdown content, MDX content, error state (default and custom message), empty content, and optional features (e.g. CSS variable customization). Stories SHALL be consistent with project conventions (e.g. one variant per story, a11y where applicable).

#### Scenario: One variant per story
- **WHEN** viewing AssistantMessage in Storybook
- **THEN** each story shows a single variant (plain text, Markdown, MDX, error, empty, customization)
- **AND** stories follow project conventions

## Intended Structure (Design)

- **AssistantMessage:** `AssistantMessage.tsx`, `AssistantMessage.types.ts`, `AssistantMessage.module.css`, `AssistantMessage.stories.tsx`, `index.ts`.
- **Dependencies:** React, TypeScript, CSS Modules, classNames utility, unified markdown renderer component (markdown-renderer), ErrorMessage.

No implementation is implied beyond what is specified; the above describes the intended design and scope.
