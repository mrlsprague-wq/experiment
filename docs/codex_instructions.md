# Codex build instructions for Deal OS

This guide turns the Deal OS concept into a practical Codex execution plan. It includes setup guidance, prompt templates, and an ordered build plan for a minimal, testable MVP.

## 1) Choose your Codex surface

**Codex web (cloud execution, great for GitHub repos)**

- Connect the GitHub repo in the Codex workspace.
- Use Codex tasks to read, edit, and run tests.
- Tag `@codex` on PR comments for follow-up changes (when enabled).

**Codex CLI (local repo control)**

```bash
npm i -g @openai/codex
codex
```

First run will prompt for login or API key.

## 2) Add project instructions (AGENTS.md)

Create two layers:

**Global defaults** (optional, applies to all repos):

```bash
mkdir -p ~/.codex
cat <<'EOF' > ~/.codex/AGENTS.md
# ~/.codex/AGENTS.md
## Working agreements
- Make minimal, high-confidence changes.
- Run tests or linters after edits when available.
- Explain what changed and why, with file paths.
- Ask before adding new production dependencies.
- Prefer security and maintainability over cleverness.
EOF
```

**Repo-specific rules** (recommended):

```bash
cat <<'EOF' > ./AGENTS.md
# Deal OS project instructions
## Working agreements
- Prioritize enterprise-grade auditability and versioned artefacts.
- Always separate evaluation vs implementation steps in proof plans.
- Keep a visible “proof gaps” list in outputs.
- Maintain a risk log for each deal.
- Prefer explicit, deterministic templates over speculative AI output.
- Run tests and include a short change log in PRs.

## Project defaults
- Tech stack: (fill in: Next.js/React, Node, Python, etc.)
- Test commands: (fill in)
- Definition of done: tests passing, docs updated, clean lint.
EOF
```

Codex will automatically read and follow these instructions.

## 3) How to prompt Codex for enterprise-grade work

Use a consistent prompt structure:

- **Goal**: what success looks like
- **Constraints**: what it must not do
- **Context**: where to look (files, folders)
- **Acceptance criteria**: tests, performance, security checks
- **Output**: PR/patch/docs

**Example prompt**:

> Add rate limiting to the public API. Constraints: no new dependencies, preserve existing behavior. Context: see `src/api/` and `middleware/`. Acceptance: unit tests pass and cover burst + steady-state. Output: commit with summary and file list.

## 4) Build plan for Deal OS (phased)

Each phase ends with: **run tests + short change log**.

### Phase 1 — Architecture & backlog

**Prompt**

> Propose an architecture and data model for Deal OS. Optimize for artefact versioning, proof-plan tracking, stakeholder mapping, and auditability. Output `/docs/architecture.md` plus a ticket breakdown in `/docs/backlog.md`.

### Phase 2 — Skeleton app

**Prompt**

> Create a minimal full-stack skeleton with auth, a `Deal` object, `Artefact` object (versioned), and `ProofPlan` object. Include basic CRUD UI and API. Minimal styling. Include tests.

### Phase 3 — Artefact Engine MVP

**Prompt**

> Implement artefact templates and a generator interface. Inputs: transcript text + deal metadata. Outputs: exec brief + follow-up email + MEDDPICC gaps. Store outputs as versioned artefacts.

### Phase 4 — Proof Plan Builder

**Prompt**

> Add proof-plan builder with decision criteria, evidence types, pass/fail thresholds, owners, due dates, and status dashboard.

### Phase 5 — Stakeholder intelligence

**Prompt**

> Add stakeholder mapping with influence, stance, relationship strength, and auto-generated change log from recent interactions. Include “mobiliser plan” suggestions.

## 5) Prompt templates you can reuse

**Artefact generation**

> Generate exec brief + follow-up email + MEDDPICC gaps for this transcript. Constraints: deterministic template output, keep placeholders for unknowns. Update existing artefacts instead of creating duplicates.

**Proof gap surfacing**

> Given this proof plan, list evidence gaps and propose the top 3 questions for the next meeting. Link each question to a specific missing criterion.

**Stakeholder updates**

> Summarize “what changed since last week” using new interactions only. Update influence/stance and list next-best actions.

## 6) Operational safety checklist

Use this checklist in prompts or AGENTS.md:

- Run unit tests and lint (if configured).
- List modified files with a one-line purpose.
- Confirm no new production dependencies unless explicitly approved.
- Provide a short changelog and any migration steps.

## 7) One-sentence pitch for reference

> Turn every customer interaction into a governed proof plan and exec-ready deal package, so enterprise deals progress on evidence, not effort.

## 8) If you want a ready-to-drop starter package

Reply with:

- Preferred stack (e.g., Next.js + Postgres, Django, Rails, etc.)
- Deployment target (Vercel, Render, AWS)
- Authentication provider (Auth0, Clerk, custom)

Then we can generate:

- `/docs/architecture.md`
- `/docs/backlog.md`
- `/docs/constraints.md`
- `/AGENTS.md` tailored to your team
