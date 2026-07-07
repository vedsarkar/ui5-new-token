---
name: container-vuln-check
description: Find a container image's open vulnerabilities via a security scanner, classify them (app nodejs deps vs base-image npm vs OS packages), verify the nodejs findings against the repo, and remediate (dependency bumps, parent-subtree refresh, override cleanup). Scanner-agnostic — the scanner is a pluggable "source adapter" (Wiz is the one implemented today). Use when the user asks for a container image's vulnerabilities / patch report, or to triage & fix nodejs CVEs for a repo — whether they name the container explicitly or expect you to derive it from the repo and confirm it.
---

# Container vulnerability check & remediation

Starting from a **container/app name**, find the freshest scanned image, list
its open vulnerabilities, verify the nodejs findings against the repository, and
remediate. The security scanner is a **pluggable source adapter** — everything
after fetching (classify → verify → remediate → report) is tool-independent. The
scanner only has to supply a normalized findings list.

Currently implemented adapter: **Wiz** (`user-wiz` MCP). To use a different tool
(Snyk, Trivy, Prisma/Twistlock, Grype, GitHub/Dependabot, …), write a new
adapter that satisfies the contract below — the rest of the runbook is unchanged.

## Pipeline

| Step | Scanner-specific? | What it does |
|---|---|---|
| 0 — Derive container name | no | resolve the image name from repo deploy artifacts, confirm with user |
| 1 — Fetch findings | **yes (adapter)** | pick the freshest scanned image, pull open findings, normalize |
| 2 — Classify | no | split app-nodejs / base-layer npm / OS packages |
| 3 — Verify vs repo | no | `npm ls` / production build to drop false positives |
| 4 — Remediate | no | bump / parent-subtree refresh / override cleanup |
| 5 — Report | no | image identity + tables + remediation grouping |

## The normalized finding (adapter contract)

An adapter takes a **container/app name** and returns two things:

1. **Chosen image identity** — `{ name, scanTime, id, severityCounts }` for the
   single image the findings come from (for provenance in the report).
2. **A list of normalized findings**, each with:

| Field | Meaning | Used by |
|---|---|---|
| `component` | package / library / OS-package name | classify, verify, remediate |
| `kind` | `library` (app code dep) or `os-package` | classify |
| `ecosystem` | e.g. `npm`/JAVASCRIPT, `apk`, `dpkg` | classify, verify |
| `currentVersion` | installed version in the image | verify |
| `fixedVersion` | first non-vulnerable version (or none) | verify, remediate |
| `locationPath` | file path in the image (e.g. `/usr/src/app/node_modules/...`) | classify |
| `severity` | CRITICAL / HIGH / MEDIUM / LOW | report, prioritization |
| `cves` | CVE / advisory IDs | report |
| `exploit` | `hasExploit` / KEV flags | prioritization |

Anything the scanner can't provide, leave empty — the generic steps degrade
gracefully (e.g. no `locationPath` → rely on `kind` + `ecosystem` only).

## Step 0 — Derive the container name from the repo

The container/app name (the scanner search key) is often **not** the repo
directory or the `package.json` `name`. The npm/package name and the deployed
image name can differ — using the wrong one returns no or incorrect images. If
the user already gave you the container name, use it and skip this step.

Otherwise derive it yourself, then **confirm the derived name with the user
before querying the scanner** (state where you found it and ask them to approve
or correct it). Only proceed once the name is confirmed.

Resolve it from deployment artifacts, in priority order:

1. **`**/helm/*/Chart.yaml` → `name:`** — the Helm chart / k8s deployment name;
   matches the image repo `<registry>/<project>/<name>`. Primary source.
2. **`Dockerfile`** — the `COPY <name>.zip` (or equivalent artifact) name and
   the `WORKDIR` (which matches the scanner's `locationPath`, e.g.
   `/usr/src/app`). Also read its `FROM` line to get the **base image** for
   OS/base-layer CVE remediation.

Cross-check (same value, do not use as primary): a Sentry `project` in the build
config (e.g. `webpack.config.js`); an OTEL `serviceName` / `OTEL_SERVICE_NAME`
default in server code.

**Do NOT derive the name from:** `package.json` `name` (npm/repo name, may differ
from the image); env-prefixed config files (e.g. `config/<env>-<name>.properties`),
`.gitignore`, or READMEs (config naming, not the image name); test fixtures.

## Step 1 — Fetch findings via a source adapter

Use the adapter to turn the confirmed container name into the chosen image
identity + normalized findings (per the contract above). **Default target: the
freshest developer container variant** (for the Wiz/GCR setup that is the
**tst-01** image — see the adapter). If several images match, pick the newest
scan of that variant and report which one you picked and why. **If the adapter
cannot find that variant, stop and ask the user which container variant to
scan** — don't silently fall back to an arbitrary registry/environment.

### Wiz adapter (implemented)

Drive everything through the `user-wiz` MCP server via `CallMcpTool`. If unsure
of a tool's args, read its descriptor under `mcps/user-wiz/tools/<tool>.json`.

**Prerequisite — Wiz MCP installed & authenticated.** If `CallMcpTool` to
`user-wiz` fails or the server is missing:

1. Add the Wiz hosted endpoint to `~/.cursor/mcp.json` (global) or
   `.cursor/mcp.json` (project):

   ```json
   {
     "mcpServers": {
       "wiz": { "url": "https://mcp.app.wiz.io" }
     }
   }
   ```

2. Restart Cursor, open `Settings -> MCP & Integrations`, and authenticate:
   click the **"Needs authentication"** text under the `wiz` server (if the
   browser does not open automatically) and complete the Wiz OAuth login (Okta).
3. Requires an active Wiz account with MCP access to the relevant tenant.

Stop and ask the user to complete this if authentication is not in place.

**Runbook → MCP mapping** (the manual Wiz UI, for reference):

| Manual UI step | MCP equivalent |
|---|---|
| Open Wiz via Okta | `user-wiz` MCP already authenticated — no browser |
| Know which app/image to search for | Step 0 (derive + confirm) |
| Inventory → Container Images → search by name | `list_container_images { search, first: 50 }` |
| Find image, sort First seen ↓ (newest) | pick the newest matching image (rules below) |
| Image → Vulnerability → Patch Report → Critical/High | `list_vulnerability_findings { asset_id, severity, status:["OPEN"] }` |
| Filter Type = nodejs, path `/usr/src/app/...` | classify step (generic) |

**Pick the freshest image.** Default target: the **tst-01** registry
(`gcr.io/tst-01-144618/<name>`) — the freshest developer container variant. Call
`list_container_images { "search": "<name>", "first": 50 }`. From
`cloudResourcesV2.nodes`, choose ONE asset:

- keep only images whose `containerRepository.name` / `externalId` contains
  `tst-01`;
- drop arm64 manifests (`externalId` ends with `##arm64`) and any node with
  `vulnerabilityAnalytics: null` (not scanned);
- among the rest pick the **newest `updatedAt`**.

Use that node's `id` as `asset_id`. Report `name`, `updatedAt`, and
`vulnerabilityAnalytics` counts. **Gotcha:** use the **CONTAINER_IMAGE** asset
from Inventory, NOT the running k8s **CONTAINER** — the runtime container can
carry a stale/odd scan snapshot.

**If no tst-01 image is found:** first retry `search` with the bare app name or
`"tst-01/<name>"`. If there is still no tst-01 match, **stop and ask the user
which container variant to scan** (e.g. a different environment/registry such as
`customer-facing`, a specific tag, or another image name) — don't silently fall
back to an arbitrary registry.

**Pull findings.** `list_vulnerability_findings` caps `first` at 20, so paginate
by severity:

```
list_vulnerability_findings { "asset_id":["<id>"], "severity":["CRITICAL"], "status":["OPEN"], "first":20 }
list_vulnerability_findings { "asset_id":["<id>"], "severity":["HIGH"],     "status":["OPEN"], "first":20 }
```

Pull MEDIUM/LOW too if the user wants the full list. If a severity's
`totalCount` exceeds what you received, note it (and page further if asked).
`list_vulnerability_findings_grouped { group_by:["DETAILED_NAME"] }` is a fast
way to get the component breakdown with `fixedVersion`.

**Field mapping → normalized shape:** `detailedName`→`component`,
`artifactType.group` (`CODE_LIBRARY`→`library`, `OS_PACKAGE`→`os-package`)→`kind`,
`artifactType.codeLibraryLanguage`/`osPackageManager`→`ecosystem`,
`version`→`currentVersion`, `fixedVersion`, `locationPath`, `severity`,
`vulnerabilityExternalId`/`name`→`cves`, `hasExploit`/`hasCisaKevExploit`→`exploit`.

**Related Wiz tools:** `list_projects` (resolve a project id, e.g. confirm
TST-01); `get_cloud_resource` (image/container metadata, deployed tag);
`get_vulnerability_finding` (full evidence for a single CVE).

### Adding a new adapter

To support another scanner, add a `### <Tool> adapter` subsection here that
documents:

1. **Access** — MCP server / CLI / API, and how to authenticate.
2. **Locate the image** — how to search and how to pick the freshest scanned
   image for the intended registry/env (and any "use the image, not the runtime"
   style gotchas).
3. **Pull findings** — the call(s), pagination limits, how to get only OPEN /
   fixable ones.
4. **Field mapping** — map the tool's fields onto the normalized finding
   contract above. That mapping is the whole job; Steps 2–5 stay identical.

## Step 2 — Classify findings

Dedupe by `component@version` (the same CVE often appears under both
`node_modules/<pkg>/package.json` and `package-lock.json`). Then split by `kind`
+ `locationPath`:

- **nodejs, repo-actionable**: `kind == library` AND `locationPath` under
  `/usr/src/app/node_modules/` or `/usr/src/app/package-lock.json`. These map to
  repo dependency changes.
- **nodejs, NOT app tree**: `library` under other paths (e.g.
  `/usr/local/lib/node_modules/npm/...` = npm's own bundle in the base image).
  Flag separately — fixed by a base-image/Node bump, not `package.json`.
- **OS packages**: `kind == os-package` (apk/dpkg). Base-image concern — bump the
  base image / OS package, rebuild.

For each component capture: severity, `currentVersion`, `fixedVersion`,
`exploit` flags, and the CVE list.

## Step 3 — Verify nodejs findings against the repo

Clone/open the app's own repository (the image may build from a different repo
than the current workspace). For each repo-actionable package:

```bash
npm ls <package>            # what the tree resolves today
```

If the installed version is `>=` the `fixedVersion`, it is likely
**fixed/false-positive** — note and skip. When the dev tree looks clean but the
image still flags it, check the production tree (dev deps are pruned in the image):

```bash
npm ci
npm ci --omit=dev
npm ls <package>
```

Decision per package:
- installed `>=` fix → **fixed**, skip.
- direct dep below fix → bump in `package.json`.
- transitive below fix → **first try refreshing the parent subtree** (see below),
  then `npm update`. Only fall back to `overrides` when no safe parent upgrade
  exists.

Before any change, **audit the existing `overrides` block**: a stale pin (e.g.
`"axios": "<vuln>"`) may be the very thing holding the vulnerable version. Plan
to drop/raise those in the same pass — don't add new pins on top of old ones.

## Step 4 — Remediate

### Default: refresh the parent subtree (knight's move)

Try this *before* reaching for a new override — it removes the CVE by moving the
tree forward, not by pinning:

0. **If the package is already in your `overrides`, that pin wins over the tree —
   the refresh alone won't move it.** First drop the stale override (or raise it
   to the fixed version), then run the refresh below. Often, once the pin is gone,
   the tree resolves a fixed version on its own and no override is needed at all.
1. `npm ls <vuln-pkg>` — walk the chain up to the nearest **direct** dependency
   that pulls it in (that direct dep is your lever). `npm ls` shows `overridden`
   next to any version forced by an override — that's your signal to do step 0.
2. Refresh that direct dep's subtree so npm re-resolves the intermediates to
   newer patches within their existing semver ranges:

   ```bash
   npm uninstall <direct-parent> && npm install <direct-parent>   # normal dep
   # or, for a git/pinned direct dep: rm -rf node_modules/<direct-parent> && npm install
   # or narrowly: npm update <intermediate-parent>
   ```

   **If several direct deps pull the vuln-pkg** (`npm ls` shows more than one
   branch), refreshing one is not enough — a remaining path keeps the old deduped
   version. Remove/refresh **every** direct parent until `npm ls <vuln-pkg>` is
   empty, then reinstall them. The reliable variant: temporarily delete those
   direct deps from `package.json`, `npm i`, confirm `npm ls <vuln-pkg>` →
   `(empty)`, then **re-add the exact same version ranges** and `npm i`. You are
   not changing declared versions — you're forcing a clean re-resolution.

3. Re-check: `npm ls <vuln-pkg>`. Success = it now resolves `>= fixedVersion`
   **or disappears entirely** (a newer parent patch dropped the dependency — the
   cleanest outcome). Examples: bumping the `@aws-sdk/*` chain removed
   `fast-xml-parser`/`fast-xml-builder` altogether; dropping the `axios` override
   + refreshing its parents re-resolved `@googlemaps/*` to a patch that pulls a
   fixed `axios`, so no override was needed.

This is lockfile-only (no `package.json` change) when the parent's declared
ranges already allow the newer intermediates. Afterwards **review
`git diff package-lock.json`** to confirm the change is scoped (nothing
unintended bumped or downgraded), then build + test.

### Prefer upgrades over overrides

Overrides are a last resort, not the default fix. The goal is a clean dependency
tree, not a growing pile of pins.

- **Do NOT add a new `override`** if the package that owns the vulnerable
  transitive dependency has a newer release that already resolves to a fixed
  version. Bump that parent instead. Example: a vulnerable transitive `axios`
  pulled in by `node-vault` is better fixed by upgrading `node-vault` (whose
  newer release depends on a fixed `axios`) than by pinning `axios` directly.
- **Remove existing `overrides` when they are no longer needed.** A pin like
  `"axios": "<old>"` actively holds the dependency on the vulnerable version and
  blocks the upstream fix — always check whether each existing override can be
  dropped after upgrading the parent, and remove it if so.
- Before bumping a parent across a minor/major (especially `0.x`, where minors
  can be breaking under semver), check the new version's declared dependency
  ranges resolve to fixed versions (`npm view <pkg>@<v> dependencies`), and flag
  that tests/smoke runs are needed for the bump.
- Reach for `overrides` only when there is no safe parent upgrade (parent
  unmaintained, or its latest still depends on the vulnerable range). When you
  must add one, note it as carry-over tech debt to revisit later.

## Step 5 — Report

Lead with the chosen image (name + scan time + id) so the source is explicit.
Then: CRITICAL/HIGH tables split into nodejs (repo) vs base-layer npm vs OS (base
image), per-package verify result (fixed vs real), and remediation grouped into
direct bump / parent-subtree refresh / override cleanup / transitive override
(last resort) / base-image rebuild. When a parent refresh removes a transitive
outright, or a parent upgrade lets you drop an existing override, call that out
explicitly.
