## 1. Planning & Validation
- [ ] 1.1 Validate proposal with `openspec validate update-treelist-leaf-expand-loading --strict`

## 2. Implementation
- [ ] 2.1 Update TreeItem type to include optional isLoading.
- [ ] 2.2 Adjust leaf detection to treat undefined/null children as leaves.
- [ ] 2.3 Update onExpand callback to emit (expandedKeys, treeItem).
- [ ] 2.4 Update stories/docs to cover loading state and new callback signature.

## 3. Quality
- [ ] 3.1 Run `npm run format` and `npm run lint`.
- [ ] 3.2 Run Storybook smoke check (`npm run dev`) and verify TreeList stories.

