# Goal Update

Generate Atlassian Goals artefacts — status updates, learnings, risks, decisions — as markdown files under `goals/<slug>/`. The skill gathers data from git history, changelogs, Jira, and Storybook, combines it with user-provided context (meeting notes, transcripts, links), and writes one file per artefact so each one maps 1:1 to a separate Atlassian Goals tab (Updates / Learnings / Risks / Decisions).

Atlassian Goals treats Updates, Learnings, Risks, and Decisions as **independent knowledge bases**. You can post a learning without writing a status update, log a risk weeks after the last update, etc. The repo structure mirrors that: every artefact is its own file in its own folder.

Updates are published **on demand** — whenever there's news, a release, a decision, or progress worth sharing. No fixed cadence.

## When to use this skill

Trigger words and intents:

- "Update a goal" / "Write a goal update"
- "Status update for [goal name]"
- "CoE status report"
- "Add a learning / risk / decision to [goal]"
- "Log a learning for [goal]"
- "Capture this decision under [goal]"
- The user provides context (meeting notes, release news) and wants it formatted as a goal artefact

If the user is asking about what Atlassian Goals is or how it works conceptually, point them to https://www.atlassian.com/platform/platform-apps/goals instead — that is documentation, not a task this skill solves.

## Prerequisites

This skill assumes:

- The user is working in a clone of `reltio-design`.
- Goals are stored under `goals/` at the repo root.
- Each goal has a `DESCRIPTION.md` with frontmatter metadata.
- The agent has shell access to run `git` and read files.

Optional (enhance the artefacts but not required):

- Atlassian MCP connected — for Jira issue queries
- Reltio Design MCP available — for Storybook component data. The production endpoint is **https://reltio.design/mcp** (no local setup required, always up-to-date) and is the preferred source for any agent generating updates. The local dev endpoint (`http://localhost:6006/mcp`) is only useful if Storybook is running and you need data ahead of a deploy.

## Directory structure

```
goals/
├── <goal-slug>/
│   ├── DESCRIPTION.md                         # Goal metadata + description
│   ├── updates/
│   │   ├── 2026-05-05.md                      # One file per status update
│   │   ├── 2026-05-12.md
│   │   └── 2026-05-19.md
│   ├── learnings/
│   │   ├── 2026-05-19-single-entry-point.md   # One file per learning
│   │   └── 2026-05-21-mdx-tables.md
│   ├── risks/
│   │   ├── 2026-05-19-mui-x-data-grid.md      # One file per risk
│   │   └── 2026-05-22-legacy-builds.md
│   └── decisions/
│       ├── 2026-05-19-subpath-only.md         # One file per decision
│       └── 2026-05-19-apache-2.md
```

Each entry under `updates/`, `learnings/`, `risks/`, `decisions/` is a standalone artefact that maps to a single row in the corresponding Atlassian Goals tab. **Do not** merge multiple learnings into one file — Atlassian's UI lists them individually.

## Steps

### 1. Determine the artefact type

Infer from the user's message:

- "update" / "status update" / "kick-off" / "release news" → **status update** (writes to `updates/`)
- "learning" / "we learned" / "insight" → **learning** (writes to `learnings/`)
- "risk" / "blocker" / "concern" → **risk** (writes to `risks/`)
- "decision" / "we decided" / "rationale" → **decision** (writes to `decisions/`)

If the user provides a long status-update context but also mentions learnings, risks, and decisions in it (a typical kick-off), produce **all four**: one update file plus one file per learning / risk / decision the context yields.

If the type is ambiguous, ask using AskUserQuestion.

### 2. Select a goal

Scan `goals/*/DESCRIPTION.md` to build the list of available goals. Read each file's frontmatter to extract the `name` field.

- If the user specified a goal name or slug in their message, match it (case-insensitive, partial match OK).
- If multiple matches or no match, show the list and ask using AskUserQuestion.
- If no `goals/` directory exists or it's empty, offer to create a new goal using the description template at `{SKILL_DIR}/templates/goal-description-template.md`. Ask for the goal name and slug, then create `goals/<slug>/DESCRIPTION.md` plus the four empty folders `updates/`, `learnings/`, `risks/`, `decisions/`. Stop here — the user should populate the DESCRIPTION.md with their real metadata before generating artefacts.

### 3. Read goal metadata

Read `goals/<slug>/DESCRIPTION.md` and parse the frontmatter. Extract:

- `name` — display name
- `goalId` — Atlassian Goals ARI (may be empty initially)
- `jiraJql` — JQL query template for Jira issues
- `gitPaths` — list of repo paths to scope git queries
- `storybookAreas` — Storybook sections relevant to this goal
- `metrics` — metric names tracked for the goal (reference data; updates no longer include a metrics table — metrics are tracked outside the update flow)

If the DESCRIPTION.md has no frontmatter or is missing required fields (`name`, `gitPaths`), warn the user and suggest they fill it in.

### 4. Accept additional context

The user may provide additional context alongside the command or in a follow-up message:

- Meeting notes or discussion transcripts
- Links to external docs, Confluence pages, Figma files
- Jira ticket references or URLs
- Release announcements or changelog snippets
- Screenshots or other artefacts
- Any free-form text relevant to the artefact

If the user's message contains context beyond just the goal name, capture it. If not, ask: "Do you have any additional context to include? (meeting notes, links, announcements — or skip)."

This context will be synthesised into the artefact(s) alongside automatically gathered data.

### 5. Determine lookback period (status updates only)

Check `goals/<slug>/updates/` for the most recent file by filename (lexicographic sort on `YYYY-MM-DD.md`).

- If previous updates exist: lookback period = last update date → today.
- If no previous updates: default to last 2 weeks, or wider for an explicit kick-off (covering the full goal history so far).
- The user can override with explicit dates or phrases like "since last release", "this week", "May 1-18".

Standalone learnings / risks / decisions do not need a lookback period — they capture a single insight, concern, or choice at a point in time.

### 6. Gather git data (status updates only)

Run read-only git commands scoped to the goal's configured `gitPaths`:

```bash
git log --oneline --since="{PERIOD_START}" -- {gitPaths}
```

Count commits and extract key changes. Also check for new releases:

```bash
git tag --sort=-creatordate | head -10
```

### 7. Gather changelog data (status updates only)

Read `packages/*/CHANGELOG.md` for any releases that fall within the lookback period. Extract version numbers and release summaries.

### 8. Gather Jira data (via Atlassian MCP)

If the Atlassian MCP is connected and `jiraJql` is defined in the goal's DESCRIPTION.md:

1. Use `searchJiraIssuesUsingJql` with the JQL from the goal metadata, substituting the period dates.
2. Categorise results by status: Done, In Progress, To Do.
3. Extract: issue key, summary, status, priority.

If the JQL returns 0 issues, that itself is a finding — usually means the goal's label / component is not adopted yet. Surface it as a candidate **risk** rather than silently dropping the section.

If the Atlassian MCP is not connected or the query fails, note "Jira data unavailable" and continue.

### 9. Gather Storybook data (via Reltio Design MCP)

Prefer the production endpoint **https://reltio.design/mcp** — it is always available and reflects the latest deployed Storybook. The local `http://localhost:6006/mcp` is only a fallback when working ahead of a deploy.

If reachable, use `list-all-documentation` to get the current component catalogue. If unavailable, skip and note it.

### 10. Ask user for qualitative input

Present a summary of gathered data (commits, Jira issues, releases, user-provided context) and ask for:

**For a status update:**

1. **Status assessment** — on-track / at-risk / off-track. Suggest one based on the data.
2. **Additional highlights** — accomplishments not visible in git/Jira (demos given, alignment meetings, stakeholder feedback).
3. **Next steps** — priorities for the next period.
4. **Learnings / risks / decisions to capture as separate files** — for each item, ask whether it warrants its own entry (one file per item) or is just commentary in the update. Pre-populate suggestions from the gathered data and user-provided context.

**For a standalone learning / risk / decision:**

1. **Title** — short, descriptive (becomes the H1 and the filename slug).
2. **Body** — the narrative. For risks, include severity (low / medium / high) and mitigation. For decisions, include rationale.

Use AskUserQuestion. Pre-populate suggestions from gathered data and user context to minimise effort.

### 11. Draft and review

Copy the appropriate template(s) from `{SKILL_DIR}/templates/` and fill in placeholders.

**`goal-update-template.md`** — compact status update with three sections:

- **Summary** — **HARD LIMIT: ≤ 280 characters**, plain text, no markdown formatting. Atlassian Goals truncates beyond this. Treat it as a tweet-length narrative of "where are we right now, what's the big move".
- **Key Accomplishments** — bulleted list. Group under H3 sub-headings if the update covers multiple workstreams. Be honest about what is **delivered** versus **in progress** — do not claim "delivered" if substantial work remains.
- **Next Steps** — bulleted list, ideally grouped by horizon (next 2 weeks / next 4–6 weeks / next quarter).

Do **not** add Metrics, Learnings, Risks, Decisions, or Evidence sections to the update file — those live in their own folders.

**`learning-template.md`** / **`risk-template.md`** / **`decision-template.md`** — one entry per file, frontmatter + short body. Filename: `YYYY-MM-DD-<kebab-slug>.md`.

Show the complete draft of every file you plan to write to the user for review before writing.

### 12. Write the files

For each artefact, write to the appropriate path:

- Update → `goals/<slug>/updates/<date>.md` (e.g. `2026-05-19.md`)
- Learning → `goals/<slug>/learnings/<date>-<slug>.md` (e.g. `2026-05-19-remote-mcp.md`)
- Risk → `goals/<slug>/risks/<date>-<slug>.md` (e.g. `2026-05-19-mui-x-data-grid.md`)
- Decision → `goals/<slug>/decisions/<date>-<slug>.md` (e.g. `2026-05-19-subpath-only.md`)

If a file at the target path already exists, ask the user whether to overwrite, create a versioned variant (`<date>-<slug>-v2.md`), or skip.

Do NOT `git add` or commit — leave that to the user.

After writing, show:

- Every file path created, grouped by type
- A reminder of which sections / files map to which Atlassian Goals tabs:
  - `updates/*.md` → **Updates** tab (status update text)
  - `learnings/*.md` → **Learnings** tab
  - `risks/*.md` → **Risks** tab
  - `decisions/*.md` → **Decisions** tab
- Reminder: "Commit the new files to preserve the goal history."

## Edge cases

### First update for a goal (kick-off)

No previous files exist. Default lookback is the full goal history so far. Note in the update that this is the inaugural report. Kick-offs typically produce **several** learnings, risks, and decisions at once because they synthesise everything that happened before the goal was formally tracked — generate one file per item rather than cramming them into the update.

### No DESCRIPTION.md frontmatter

The DESCRIPTION.md exists but has no or incomplete frontmatter. Warn the user and suggest they add at least `name` and `gitPaths`. The skill can still proceed with reduced functionality (no Jira queries, no scoped git log — will use full repo).

### Atlassian MCP not connected

Proceed without Jira data. The update is still valuable with git + changelog + user context.

### Reltio Design MCP unreachable

Skip Storybook data gathering. Note: "Reltio Design MCP unreachable — used in-repo `components/index.ts` and `CHANGELOG.md` instead."

### No activity in the period

Still generate the update. The "no significant changes" signal is itself valuable. Set status to what the user chooses and note low activity. Focus on qualitative content (Next Steps; any standalone learnings / risks / decisions worth logging).

### Multiple artefacts in one session

After writing one artefact, offer: "Would you like to add another learning / risk / decision, or generate an update for a different goal?"

### Editing a previous artefact

If the user asks to edit a previous file, read the existing file, show it, allow modifications, and write back to the same path.

### Rich user context

When the user provides lengthy context (meeting transcripts, discussion notes):

- Extract actionable items into the appropriate artefact type (learning, risk, decision)
- Summarise key points rather than copying verbatim
- Attribute insights where relevant ("Per discussion with [team]...")
- If uncertain about categorisation, ask the user

## Guardrails

- **Never publish to Atlassian Goals directly.** The Atlassian MCP does not expose Goals API tools. The skill produces files. Manual publishing is the user's responsibility.
- **Never commit on the user's behalf.** Show the file paths; let the user commit when ready.
- **Never delete previous artefacts or DESCRIPTION.md files.** Goals history is append-only.
- **Never fabricate data.** If a data source is unavailable, say so. Do not invent commit counts, Jira ticket numbers, or release dates.
- **Always show the draft before writing.** The user must approve every file.
- **Always read DESCRIPTION.md first.** Do not guess goal names, IDs, JQL, or git paths.
- **Always enforce the 280-character Summary limit** for status updates. Atlassian Goals truncates longer summaries; treat it as a hard constraint, not a guideline.
- **One artefact per file.** Never merge multiple learnings, risks, or decisions into a single file.
- **Accept and incorporate any user-provided context.** Meeting notes, transcripts, links — everything is valid input.

## Atlassian Goals field mapping

For reference when publishing manually:

| Repo artefact | Atlassian Goals tab |
|---|---|
| `goals/<slug>/DESCRIPTION.md` body | Overview |
| `goals/<slug>/updates/<date>.md` Summary | Update Summary (≤ 280 chars) |
| `goals/<slug>/updates/<date>.md` Key Accomplishments + Next Steps | Update body (rich text) |
| `goals/<slug>/updates/<date>.md` frontmatter `status` | Update status indicator (on-track / at-risk / off-track) |
| `goals/<slug>/learnings/*.md` | Learnings tab — one row per file |
| `goals/<slug>/risks/*.md` | Risks tab — one row per file |
| `goals/<slug>/decisions/*.md` | Decisions tab — one row per file |

## Future: API integration

The file format is designed for future API integration:

- `goalId` in DESCRIPTION.md → `goalAri` parameter in `goals_createUpdate` GraphQL mutation
- `status` values map 1:1: `on-track` → `on_track`, `at-risk` → `at_risk`, `off-track` → `off_track`
- Each artefact file → separate GraphQL mutation (`goals_createUpdate`, `goals_createLearning`, `goals_createRisk`, `goals_createDecision`)
- Summary text → ADF (Atlassian Document Format) for the API
- When Atlassian MCP adds Goals tools (or team adopts `expel-io/atlassian-goals-mcp`), a publish step can be added that walks every new file in `updates/`, `learnings/`, `risks/`, `decisions/` and POSTs each.

## References

- [Atlassian Goals](https://www.atlassian.com/platform/platform-apps/goals)
- [Goals GraphQL API](https://developer.atlassian.com/platform/goals/goals-graphql-api/introduction/)
- [Using the Goals GraphQL API](https://developer.atlassian.com/platform/goals/goals-graphql-api/using-graphql-api/)
- [What is a goal?](https://support.atlassian.com/platform-experiences/docs/what-is-a-goal/)
