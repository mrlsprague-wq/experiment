# BDR Brief Builder (Working Name)

## One-line product description
An AI app that takes an account name, a few initial thoughts, and pasted context, then researches the account and produces a tailored, BDR-ready action brief.

## Alternative names
- Account Brief
- Target Account AI
- PG Brief
- BDR Copilot
- Account Attack Plan

## Product framing
**Input minimal context. Get a high-quality account brief your BDR can act on immediately.**

---

## Core workflow

### 1) User input (minimal)
**Required**
- Account name

**Optional**
- Initial contacts to reach
- Initial thoughts
- Pasted notes / transcript / emails / context

### 2) AI processing
The app should:
- Research the company
- Identify likely priorities and challenges
- Find likely relevant stakeholders/functions
- Build a hypothesis
- Suggest messaging angles
- Recommend outreach priorities
- Produce a BDR action plan

### 3) Output
A single structured brief answering:
- Why this account matters
- What is likely going on
- Who to target
- What each person may care about
- What message angle to use
- What to do first

---

## BDR Brief structure

1. **Account snapshot**
   - Company summary
   - Size/region/market
   - Relevant business context
   - Likely commercial priorities

2. **Hypothesis**
   - `We believe [account] may be focused on [goal], but facing friction around [problem].`
   - `This likely matters now because [trigger/business context].`
   - `A strong entry point is [function/team/use case].`

3. **Why now**
   Potential triggers:
   - Transformation
   - Growth pressure
   - Product launch
   - Expansion
   - Hiring
   - Leadership change
   - Market pressure
   - Digital / sales / marketing shift

4. **Stakeholders to target**
   Shortlist only. For each:
   - Likely title
   - Why they matter
   - What they may care about
   - Whether they are a strong first target

5. **Contact recommendations**
   - If names are provided, enrich them
   - If not, suggest role types to find

6. **Message angles**
   For each stakeholder group:
   - Resonant pain
   - Outcome-led angle
   - What not to over-index on

7. **BDR action plan**
   Practical steps:
   - First 3 contacts
   - First message angle
   - Pivot logic if no response
   - Curiosity-led questions

8. **AE notes**
   - Best hypothesis
   - Likely risks
   - Missing information
   - What to validate on first call

---

## Simplified v1 scope

### Screens
1. **New Brief** (input form)
2. **Generated Brief** (one-page output)
3. **Brief History** (saved prior briefs)

### Input form fields
- Account name
- Initial contacts or titles to target
- Initial thoughts
- Additional pasted context
- CTA: **Build BDR Brief**

### Output page elements
- Header: account name, date generated, confidence level
- Sections:
  - What we know
  - Working hypothesis
  - Who to target
  - Outreach angles
  - BDR action plan
  - What to validate
- Actions:
  - Copy brief
  - Regenerate
  - Export to doc
  - Save

---

## v1 output format (tight)

### Block 1: Account overview
3-5 bullets.

### Block 2: Best hypothesis
One paragraph.

### Block 3: Who to target
Top 5 roles or people.

### Block 4: What each cares about
Simple table:
- Role
- Likely priority
- Outreach angle

### Block 5: BDR plan
Top 5 actions.

### Block 6: Things to validate
Open questions and assumptions.

---

## Backend AI workflow

1. **Company research**
   Gather:
   - Company description
   - Business model
   - Geography
   - Relevant business units
   - Recent strategic themes
   - Likely GTM motions
   - Recent initiatives or changes

2. **Context extraction**
   From pasted notes:
   - Known pain points
   - Known stakeholders
   - Prior conversations
   - Internal assumptions
   - Current angle

3. **Hypothesis generation**
   Build:
   - Strategic hypothesis
   - Likely use-case angle
   - Likely entry point

4. **Stakeholder recommendation**
   Produce:
   - Who to target
   - In what order
   - Why

5. **Brief generation**
   Output:
   - Account summary
   - Target roles
   - Messaging angles
   - First outreach plan

---

## System prompt behavior (for implementation)

### Behavior
- Research the company thoroughly
- Prioritize user-pasted notes as core context
- Infer likely business priorities and GTM challenges
- Recommend best entry-point stakeholders
- Produce actionable BDR guidance (not vague strategy)
- Be specific, commercially relevant, and concise

### Style
- Practical
- Sharp
- No fluff
- Role-based
- BDR-ready

---

## Recommended MVP data model

### Brief
- `id`
- `account_name`
- `initial_contacts_text`
- `initial_thoughts_text`
- `pasted_context_text`
- `generated_output_json`
- `created_at`
- `updated_at`

### Optional: Contact candidate
- `id`
- `brief_id`
- `name_or_role`
- `why_relevant`
- `priority`
- `messaging_angle`

> Note: In v1, contact candidates can also remain nested in `generated_output_json` to keep schema complexity low.

---

## Non-goals
This is not:
- An account planning platform
- A CRM
- A task manager
- A workflow system

This is:
- An AI tool that turns sparse account input into a smart account brief for pipeline generation.
