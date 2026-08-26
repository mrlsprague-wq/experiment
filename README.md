# 6sense Intelligence Agent

A Claude Code subagent purpose-built to maximise the use of the
[6sense MCP Server](https://support.6sense.com/docs/6sense-model-context-protocol-mcp-1)
(beta). It turns any GTM question — "what's happening with this account?",
"who should we target this week?", "is our advertising working?" — into live
6sense queries and an action-oriented readout, instead of an answer from
memory.

## What's in this repo

| Path | Purpose |
|------|---------|
| `.claude/agents/6sense-intelligence.md` | The agent definition: trigger conditions, tool grants, capability map, and five end-to-end playbooks |

## What the agent does

The agent routes every request through the 6sense MCP Server's capability
domains and combines as many as are relevant per question:

- **Account insights** — engagement, buying signals, 6QA (6sense Qualified
  Account) status
- **Predictive buying stages** — and, more importantly, stage *movement*
- **Keyword intent** — current topics, rising spikes, and research gaps
- **Segments** — membership lookup and conversational account filtering
- **Ad campaign performance** — broken down by buying stage
- **Company identification & enrichment** — domain → firmographics,
  technographics, intent scores

It ships with five ready-to-run playbooks: **Account 360**, **Hot-accounts
brief**, **Intent digest**, **Campaign readout**, and **Deal support** (call
prep). Every deliverable ends with recommended next actions tied to specific
6sense evidence.

## Prerequisites

1. A 6sense instance with **Revenue Marketing Platform (RMP)** access. The
   MCP beta is not available to Sales Intelligence–only licenses.
2. The **6sense MCP** connector added and OAuth-authorized:
   - **claude.ai / Claude Code on the web:** Settings → Connectors → add the
     6sense MCP server as a remote connector (Dynamic Client Registration is
     supported where the platform allows it), then enable it for the chat or
     session.
   - **Claude Code CLI:** `claude mcp add --transport http 6sense <server URL
     from the 6sense setup docs>` and complete the OAuth flow.

The current 6sense MCP release is **read-only**: the agent can retrieve
everything above but cannot modify segments, campaigns, or CRM records, and
it is written to say so rather than pretend otherwise.

## Usage

With this repo checked out, Claude Code picks up the agent automatically.
Invoke it explicitly or let it trigger on GTM questions:

```
> Use the 6sense-intelligence agent: what's happening with acme.com?
> Which of our accounts are 6QA and spiking on intent right now?
> Prep me for my call with the VP Marketing at globex.com tomorrow.
> Is our current ad spend moving accounts through buying stages?
```

If the connector isn't enabled in the session, the agent stops and tells you
exactly what to enable instead of quietly answering from the web.
