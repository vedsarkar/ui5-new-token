# Guide Writing Instructions for AI Agents

This document provides instructions for AI agents and developers on creating and maintaining technical guides in the `guides/` directory.

## Purpose

Guides in this directory help developers, designers, and stakeholders understand workflows, patterns, and best practices in the Reltio Design Platform. Each guide should be practical, actionable, and focused on a specific topic.

## Product Positioning

Reltio Design Platform supports Reltio product experiences across **Context Intelligence and Unified Data**. Guides must not frame Reltio as only an MDM platform unless the specific topic is explicitly MDM-specific.

When writing guide titles, introductions, business-value sections, examples, or summaries:

- Prefer broad language such as **Reltio applications**, **Reltio product experiences**, **Reltio business components**, **data stewardship**, **Context Intelligence**, and **Unified Data**
- Use **MDM** only for truly domain-specific concepts such as match groups, survivorship, entity merge/unmerge, and source priority
- Make Reltio Design MCP visible when relevant as the remote delivery channel that brings current guidance, components, examples, and API contracts into product teams' AI-agent workflows

## File Format Requirements

### File Naming

- Use kebab-case: `topic-name.story.mdx`
- Be descriptive but concise: `accessibility-testing.story.mdx`, `component-theming.story.mdx`
- Always use `.story.mdx` extension for Storybook integration

### Required Header

Every guide must start with Storybook metadata:

```mdx
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Guides/Your Guide Title" />
```

## Content Structure (Diátaxis Framework)

Use the [Diátaxis framework](https://diataxis.fr/) to determine the type of content you're writing:

| Type | Purpose | User Need | Style |
|------|---------|-----------|-------|
| **Tutorial** | Learning-oriented | "Teach me" | Step-by-step, hands-on |
| **How-to Guide** | Task-oriented | "Help me do X" | Practical, goal-focused |
| **Reference** | Information-oriented | "What is X?" | Accurate, complete |
| **Explanation** | Understanding-oriented | "Why is X?" | Conceptual, contextual |

Most guides in this directory are **How-to Guides** or **Explanations**. Keep content types separate — don't mix a tutorial with reference documentation.

## Research Before Writing

**Before creating or significantly updating a guide, research the topic first.** This ensures guides are based on industry best practices, not just internal assumptions.

### Research Process

1. **Search for best practices** — Use web search to find authoritative sources on the topic
2. **Look for style guides** — Check if major companies (Google, Microsoft, Airbnb) have published guidance
3. **Find real-world examples** — Look for how other design systems or projects handle the topic
4. **Identify common patterns** — Note what multiple sources agree on
5. **Synthesize insights** — Combine external best practices with internal context

### What to Search For

| Guide Topic | Search Queries |
|-------------|----------------|
| Component patterns | "[component] best practices", "[component] accessibility guidelines" |
| Development workflows | "[workflow] guide 2024", "how to [workflow] best practices" |
| Testing | "[type] testing best practices", "how to test [subject]" |
| Accessibility | "WCAG [component]", "[component] a11y guidelines" |
| Performance | "[subject] performance optimization", "[subject] performance best practices" |

### Evaluating Sources

Prefer sources from:
- **Official documentation** — React, MDN, W3C, WCAG
- **Major tech companies** — Google, Microsoft, GitHub, Atlassian
- **Established communities** — Write the Docs, A11y Project, Smashing Magazine
- **Design system teams** — Carbon, Chakra UI, Material Design, Radix

Avoid:
- Outdated articles (check publication date)
- Sources without clear authorship
- Content that contradicts official documentation

### Citing Sources

Always include a **Sources and References** section at the end of the guide with links to the resources that informed your writing. This:
- Builds credibility
- Helps readers dive deeper
- Shows the guide is based on research, not opinion

## Standard Guide Template

```mdx
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Guides/[Guide Title]" />

# [Guide Title]

[One paragraph introduction explaining what this guide covers and who it's for.]

> **🎯 Key Principle:** [The most important takeaway in one sentence.]

## Business Value (optional)

[Why does this matter? Include a table with benefits if applicable.]

<table>
  <thead>
    <tr>
      <th>Benefit</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Benefit 1]</td>
      <td>[Description]</td>
    </tr>
  </tbody>
</table>

## [Main Section 1]

[Content with clear explanations.]

### [Subsection]

[More detailed content.]

## [Main Section 2]

[Continue with logical flow.]

## Best Practices

[Summarize key recommendations. Use inline Do/Don't blocks within sections to highlight correct vs incorrect approaches.]

## Troubleshooting (optional)

### "[Common Problem]"

[Solution or workaround.]

## Quick Reference

[Summary tables or checklists for easy scanning.]

## Sources and References

[Links to external resources that informed this guide.]

- [Source Title](https://example.com) — brief description of what it covers
- [Another Source](https://example.com) — brief description
```

## Writing Style Guidelines

### Language

- **Write in English** — all guides must be in English
- **Use active voice** — "Click the button" not "The button should be clicked"
- **Use present tense** — "The component renders" not "The component will render"
- **Be direct** — avoid filler words like "basically", "simply", "just"

### Clarity

- **Define acronyms** on first use: "Design System (DS)"
- **Avoid jargon** when simpler words work
- **One idea per paragraph** — keep paragraphs short (3-5 sentences max)
- **Use examples** — show, don't just tell

### Structure

- **Use headings** (H2, H3) to organize content hierarchically
- **Use bullet points** for lists of 3+ items
- **Use numbered lists** for sequential steps
- **Use tables** for comparisons or structured data (HTML tables for MDX)
- **Use code blocks** with language hints: ` ```tsx `, ` ```bash `

### Tone

- **Friendly but professional** — not overly casual, not stiff
- **Helpful** — anticipate reader questions
- **Respectful** — don't assume prior knowledge without context

### Emojis

Use emojis in moderation for visual emphasis:

- **✅ Callouts** — emojis help draw attention (🎯, 💡, ⚠️)
- **✅ Small tables** — emojis can categorize rows visually
- **✅ Do/Don't blocks** — ✅ and ❌ improve scannability
- **❌ Body text** — avoid emojis in regular paragraphs
- **❌ Headings** — keep section titles clean and professional
- **❌ Overuse** — don't add emojis to every element

## Visual Elements

### Callouts

Use blockquotes for important information. Emojis are encouraged in callouts for visual emphasis:

```mdx
> **🎯 Key Principle:** The most important takeaway.

> **💡 Tip:** Helpful advice for better results.

> **⚠️ Warning:** Something that could cause problems.

> **Important:** Critical information the reader must know.

> **Rule of Thumb:** A practical guideline for decision-making.
```

### Tables

Use HTML tables for complex data (MDX requirement). Emojis are acceptable in small tables for visual categorization, but use them sparingly:

```html
<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

### Inline Do/Don't Blocks

Use inline Do/Don't blocks within sections to highlight correct vs incorrect approaches. Place them contextually where the advice is most relevant, not in a separate section:

```mdx
**✅ Do:** Use semantic color tokens

\`\`\`css
color: var(--color-text-primary);
\`\`\`

**❌ Don't:** Hardcode color values

\`\`\`css
color: #333333;
\`\`\`
```

**Guidelines for inline Do/Don't:**
- Place them in context, within the section where the advice applies
- Use ✅ and ❌ emojis for visual scanning
- Keep code examples short (1-3 lines)
- One concept per Do/Don't pair
- "Do" comes first (positive pattern)

### Code Examples

- Keep examples minimal but complete
- Show the simplest use case first
- Add comments for non-obvious parts
- Use realistic variable names

```tsx
// Good: Clear and minimal
<Button variant="primary" onClick={handleSubmit}>
  Submit
</Button>

// Avoid: Too complex for a basic example
<Button
  variant="primary"
  size="medium"
  leftIcon={<CheckIcon />}
  rightIcon={<ArrowIcon />}
  isLoading={isSubmitting}
  loadingText="Submitting..."
  onClick={async () => {
    setIsSubmitting(true);
    await submitForm(data);
    setIsSubmitting(false);
  }}
>
  Submit
</Button>
```

## Content Principles

### 1. Know Your Audience

Identify who will read this guide:

| Audience | Needs | Focus On |
|----------|-------|----------|
| **Developers** | Implementation details | Code examples, API, patterns |
| **Designers** | Visual consistency | Design tokens, spacing, usage |
| **Stakeholders** | Business value | Benefits, ROI, timelines |
| **New team members** | Getting started | Context, prerequisites, basics |

### 2. Focus on User Goals

- Start with what the reader wants to accomplish
- Organize content around tasks, not features
- Answer "how do I..." questions

### 3. Show, Don't Just Tell

```mdx
// Bad: Just telling
The Button component supports variants.

// Good: Showing with example
The Button component supports three variants:

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

### 4. Keep It Scannable

- Use descriptive headings that work as a table of contents
- Put the most important information first
- Use bold for key terms: **important concept**
- Include a Quick Reference section for long guides

### 5. Stay Up-to-Date

- Update guides when related code changes
- Remove deprecated information
- Add dates or version numbers when relevant

## Quality Checklist

Before publishing a guide, verify:

- [ ] **Research completed** — external sources consulted before writing
- [ ] File uses correct `.story.mdx` format with proper header
- [ ] Title is clear and descriptive
- [ ] Introduction explains purpose and audience
- [ ] Content is organized with logical headings
- [ ] All code examples are tested and work
- [ ] Tables use HTML format (not Markdown)
- [ ] No broken links or missing images
- [ ] Language is clear and jargon-free
- [ ] Guide answers the reader's actual questions
- [ ] Inline Do/Don't blocks included where relevant for common mistakes
- [ ] **Sources and References section** included with 3-7 quality links
- [ ] Formatting is consistent with existing guides

## Modifying Existing Guides

When asked to update an existing guide:

1. **Read the entire guide first** — understand its structure and style
2. **Research if adding new content** — search for best practices on new topics being added
3. **Match the existing style** — tone, formatting, heading levels
4. **Preserve valuable content** — don't remove information without reason
5. **Update related sections** — if one section changes, check if others need updates
6. **Update Sources section** — add new references for new content
7. **Verify code examples still work** after changes

## Examples of Good Patterns

### Good: Inline Do/Don't Blocks

The Do/Don't format makes correct usage immediately clear. Place these blocks **inline within relevant sections**, not in a separate section at the end.

```mdx
## Styling Components

When styling components, use design tokens for consistency.

**✅ Do:** Use semantic color tokens

\`\`\`css
color: var(--color-text-primary);
\`\`\`

**❌ Don't:** Hardcode color values

\`\`\`css
color: #333333;
\`\`\`

This ensures your styles adapt to theme changes automatically.
```

**When to use inline Do/Don't:**
- When explaining a concept that has common mistakes
- When comparing correct vs incorrect approaches
- When teaching best practices with concrete examples
- Place them right where the advice is relevant

**Tips for effective Do/Don't:**
- Keep code snippets short (1-3 lines)
- Use ✅ and ❌ emojis for quick visual scanning
- Put "Do" first (positive pattern)
- One concept per pair
- Surround with context (before/after text)

### Good: Comparative Tables

<table>
  <thead>
    <tr>
      <th>Do This</th>
      <th>Avoid This</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Short, focused guides</td>
      <td>Massive all-in-one documents</td>
    </tr>
    <tr>
      <td>Real code examples</td>
      <td>Pseudocode or abstract descriptions</td>
    </tr>
    <tr>
      <td>Task-oriented sections</td>
      <td>Feature lists without context</td>
    </tr>
  </tbody>
</table>

### Good: Step-by-Step Instructions

```mdx
## Getting Started

### 1. Install Dependencies

First, install the required packages:

\`\`\`bash
npm install @reltio/design-system
\`\`\`

### 2. Import Components

Add the import to your file:

\`\`\`tsx
import { Button } from "@reltio/design-system";
\`\`\`

### 3. Use the Component

Add the component to your JSX:

\`\`\`tsx
<Button onClick={handleClick}>Click Me</Button>
\`\`\`
```

### Good: Troubleshooting Sections

```mdx
## Troubleshooting

### "Component doesn't render correctly"

Check that you've loaded the design tokens stylesheet and set the active theme on an ancestor element:

\`\`\`html
<link rel="stylesheet" href="https://reltio.design/variables.css" />
<link rel="stylesheet" href="https://reltio.design/fonts.css" />

<div data-theme="horizon-light">
  <!-- Your app -->
</div>
\`\`\`

### "Styles are missing"

Ensure both \`variables.css\` and \`fonts.css\` are loaded in \`<head>\` from \`https://reltio.design/\` (or your own self-hosted origin).
```

### Good: Sources and References

Always end guides with a Sources section linking to authoritative resources:

```mdx
## Sources and References

This guide is based on industry best practices from:

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — official accessibility standards
- [React Accessibility Docs](https://react.dev/reference/react-dom/components#form-components) — React-specific guidance
- [A11y Project Checklist](https://www.a11yproject.com/checklist/) — practical accessibility checklist
- [Inclusive Components](https://inclusive-components.design/) — pattern library for accessible UI
```

**Tips for Sources sections:**
- Include 3-7 high-quality sources (not too few, not overwhelming)
- Add brief descriptions explaining what each source covers
- Prefer official documentation and established authorities
- Use descriptive link text, not raw URLs
- Verify links are not broken before publishing

## Sources and References

These instructions are based on industry best practices:

- [Google Developer Documentation Style Guide](https://developers.google.com/tech-writing/resources)
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- [Diátaxis Framework](https://diataxis.fr/)
- [Write the Docs Community Guides](https://www.writethedocs.org/guide/)
- [GitHub Documentation Guide](https://github.blog/developer-skills/documentation-done-right-a-developers-guide/)

## Summary

When creating or modifying guides:

1. **Research first** — search for best practices and authoritative sources before writing
2. **Use `.story.mdx` format** with proper Storybook metadata
3. **Follow the template** — introduction, sections, best practices, do's/don'ts, troubleshooting
4. **Write clearly** — active voice, present tense, short paragraphs
5. **Show examples** — code is better than description
6. **Use inline Do/Don't blocks** — place them contextually where advice applies
7. **Organize for scanning** — headings, tables, bullet points
8. **Cite your sources** — include Sources and References section at the end
9. **Match existing style** — consistency across guides matters
