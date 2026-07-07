---
"@reltio/skills": minor
---

Add the `container-vuln-check` agent skill.

A new bundled skill guides an agent from a container/app name through finding the freshest scanned image, listing its open vulnerabilities, classifying them (app Node.js deps vs base-image npm vs OS packages), verifying the Node.js findings against the repository, and remediating (dependency bumps, parent-subtree refresh, override cleanup). The security scanner is a pluggable "source adapter" — everything after fetching is tool-independent — with a Wiz adapter (via the `user-wiz` MCP) implemented today. Install it with `npx @reltio/skills install container-vuln-check`.
