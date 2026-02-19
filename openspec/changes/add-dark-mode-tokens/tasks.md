## 1. Global Color Tokens

- [ ] 1.1 Define all `:root` light theme tokens in `public/variables.css` (text, surface, border, primary, error, accent, effects)
- [ ] 1.2 Add `[data-theme="dark"]` block with dark overrides for every token
- [ ] 1.3 Remove the existing minimal dark block from `public/global.css` and reference tokens instead

## 2. Component CSS Migration

- [ ] 2.1 Migrate `Button.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.2 Migrate `AssistantLoader.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.3 Migrate `Chat.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.4 Migrate `AssistantMessage.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.5 Migrate `UserMessage.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.6 Migrate `Details.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.7 Migrate `ErrorMessage.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.8 Migrate `Markdown.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.9 Migrate `Skeleton.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.10 Migrate `TextArea.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.11 Migrate `TreeList.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.12 Migrate `TreeNode.module.css` — replace hardcoded color fallbacks with global token references
- [ ] 2.13 Migrate `TreeLevelLines.module.css` — replace hardcoded color fallbacks with global token references

## 3. Verification

- [ ] 3.1 Run `npm run lint` and fix any issues
- [ ] 3.2 Run `npm run test` and fix any failures
- [ ] 3.3 Verify all components render correctly in Storybook light theme
- [ ] 3.4 Verify all components render correctly in Storybook dark theme
