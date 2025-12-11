# Tasks: TreeList Component

Feature: TreeList Component
Branch: 001-treelist-component

## Phase 1: Setup

- [X] T001 Create component file skeleton at /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T002 [P] Create CSS Module at /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.module.css
- [X] T003 [P] Create index export file at /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/index.ts
- [X] T004 [P] Create Storybook scaffold at /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.stories.tsx

## Phase 2: Foundational

- [X] T005 Define strict props and public types in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T006 Integrate utils flattenTree/identity with types in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T007 Add base a11y root semantics (role=\"tree\") in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T008 [P] Ensure Biome passes for new files (no warnings) in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList

## Phase 3: User Story 1 - Display Hierarchical Data (P1)

- [X] T009 [US1] Render hierarchical data with visual indentation in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T010 [P] [US1] Add styles for indentation and container in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.module.css
- [X] T011 [P] [US1] Add Storybook story \"Basic rendering\" in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.stories.tsx
- [X] T012 [US1] Handle empty data gracefully in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T013 [US1] Export public types via /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/index.ts

## Phase 4: User Story 2 - Expand and Collapse Nodes (P2)

- [X] T014 [US2] Implement expansion state (controlled/uncontrolled) in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T015 [P] [US2] Add expand/collapse controls and indicators in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T016 [P] [US2] Add Storybook stories \"Expand/Collapse\" in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.stories.tsx
- [X] T017 [US2] Remove/disable expand control when node has no children in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx

## Phase 5: User Story 3 - Customize Node Appearance and Behavior (P3)

- [X] T018 [US3] Add renderNode callback and integrate into node rendering in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T019 [P] [US3] Add getNodeProps/className overrides and onNodeClick handler in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T020 [P] [US3] Add Storybook \"Custom rendering and interactions\" in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.stories.tsx

## Phase 6: User Story 4 - Handle Dynamic Data Updates (P3)

- [X] T021 [US4] Preserve expanded state across data changes in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T022 [P] [US4] Recompute flatten on moves/add/remove; ignore orphaned ids in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T023 [P] [US4] Add Storybook \"Dynamic updates\" in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.stories.tsx

## Final Phase: Polish & Cross-Cutting Concerns

- [X] T024 Implement keyboard navigation (Arrow keys, Home/End, Enter/Space) in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [ ] T025 [P] Add full ARIA roles/attributes (tree, treeitem, group, aria-expanded, aria-level) in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T026 [P] Memoize flatten/visible rows and memoize row items in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T027 [P] Guard custom renderer with try/catch and onRenderError in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T028 [P] Add circular reference detection and depth guard in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.tsx
- [X] T029 [P] Update quickstart.md examples for final API at /Users/olgavakulenko/Desktop/reltio-design/specs/001-treelist-component/quickstart.md
- [X] T030 [P] Add accessibility and performance demo stories in /Users/olgavakulenko/Desktop/reltio-design/components/TreeList/TreeList.stories.tsx

---

## Dependencies (Story Order)

1. US1 → 2. US2 → 3. US3 → 4. US4

- US2 depends on US1 (base rendering)
- US3 depends on US1 (rendering available; independent of US2)
- US4 depends on US1 and US2 (state preservation + updates)

## Parallel Execution Examples

- While implementing T014 (expansion state), execute in parallel:
  - T015 (controls UI) [P], T016 (stories) [P]
- While implementing T018 (renderNode), execute in parallel:
  - T019 (props/handlers) [P], T020 (stories) [P]
- During Polish phase, T025–T030 can run largely in parallel across separate files/concerns.

## Implementation Strategy (MVP First)

- MVP Scope: Complete Phase 3 (US1) — basic hierarchical rendering with indentation and empty data handling, plus public types and story.
- Incrementally add US2 (expand/collapse), US3 (customization), then US4 (dynamic updates), followed by polish.

## Independent Test Criteria

- US1: Hierarchical display shows correct parent-child indentation; multiple root levels aligned; depth levels visually distinct.
- US2: Expand/collapse toggles visibility correctly; indicators reflect state; controls removed when no children; parent collapse hides descendants (state preserved).
- US3: Custom renderer output is used; custom classes/styles applied; custom handlers receive correct node data; conditional node types supported.
- US4: Add/remove/modify/move updates reflect in UI while preserving expansion where applicable.


