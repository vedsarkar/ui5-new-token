## 1. Planning & Validation
- [x] 1.1 Validate proposal with `openspec validate update-treelist-leaf-expand-loading --strict`

## 2. Implementation
- [x] 2.1 Update TreeItem type to include optional isLoading.
- [x] 2.2 Adjust leaf detection to treat undefined/null children as leaves.
- [x] 2.3 Update onExpand callback to emit (expandedKeys, treeItem).
- [x] 2.4 Update stories/docs to cover loading state and new callback signature.

## 3. Quality
- [x] 3.1 Run `npm run format` and `npm run lint`.
- [x] 3.2 Run Storybook smoke check (`npm run dev`); attempts with `--smoke-test` on ports 6006/7007/auto were blocked (ports unavailable in environment).

