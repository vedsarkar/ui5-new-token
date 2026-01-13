# Change: Update TreeList leaf detection, expand payload, and loading state

## Why
Current TreeList behavior treats nodes with empty children arrays as leaves, making it impossible to keep a node expandable while children are being fetched. The onExpand callback also lacks the clicked node data, and TreeItem cannot flag a loading state for UI feedback.

## What Changes
- Detect leaves based on absence of children (undefined/null), not empty array length.
- Emit onExpand(updatedKeys, treeItem) so consumers know which node triggered the change.
- Extend TreeItem with optional isLoading to render loading state while children load.

## Impact
- Affected specs: treelist-component
- Affected code: components/TreeList/TreeList.tsx, TreeList.types.ts, helpers, stories/docs

