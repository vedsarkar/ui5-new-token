---
title: "Remote MCP unlocks real-time access for distributed teams"
date: 2026-05-19
---

# Remote MCP unlocks real-time access for distributed teams

The remote Reltio Design MCP at <https://reltio.design/mcp> turned out to be the single highest-leverage piece of platform tooling shipped so far. A local MCP requires `npm run dev` on every developer machine; a remote MCP requires nothing. Any team — and any AI agent — can query the live component catalogue, JSON Schemas, JSDoc-annotated types, and raw stories source from anywhere.

This matters most for the migration goal: 16 application teams will consume `@reltio/design` from outside this repo. With the remote MCP they get up-to-date guidance (component lists, prop tables, usage snippets) without any setup, and AI agents wiring `Cursor` / Claude Code into their workflows can answer "how do I use `<Component>`?" with no roundtrip to the CoE.
