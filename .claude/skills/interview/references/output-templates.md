# Output Templates

Templates for documenting interview findings.

----------------------------------------------------------------------------
## Kickoff Output: PRD Requirements Section
----------------------------------------------------------------------------

After kickoff interview, requirements go into PRD.md using this format:

```markdown
## Requirements

### [Feature Area] (e.g., Authentication)

| Code | Requirement | Priority |
|------|-------------|----------|
| REQ-AUTH-001 | [Clear requirement statement] | Must |
| REQ-AUTH-002 | [Clear requirement statement] | Must |
| REQ-AUTH-003 | [Clear requirement statement] | Should |

### [Feature Area] (e.g., Wallet System)

| Code | Requirement | Priority |
|------|-------------|----------|
| REQ-WALLET-001 | [Clear requirement statement] | Must |
| REQ-WALLET-002 | [Clear requirement statement] | Must |
```

**Requirement statement guidelines:**
- Start with action verb: "Allow user to...", "Calculate...", "Display..."
- Be specific and testable
- One requirement per row
- Use consistent coding: REQ-[AREA]-[NNN]

**Priority levels:**
- Must: Required for MVP
- Should: Important but not blocking
- Could: Nice to have
- Won't: Explicitly out of scope (document these too)

----------------------------------------------------------------------------
## Kickoff Output: SPRINT_PLAN.md Structure
----------------------------------------------------------------------------

After kickoff, sprint breakdown goes into SPRINT_PLAN.md:

```markdown
# Sprint Plan

## Overview

[1-2 sentence project summary]

**Total Sprints:** X
**Current Sprint:** [None - planning complete]

---

## Sprint 1: [Name]

**Status:** Not Started
**Goal:** [One sentence describing shippable outcome]

### Scope
- REQ-XXX-001 through REQ-XXX-010 ([Feature area])
- REQ-YYY-001 through REQ-YYY-005 ([Feature area])

### Dependencies
- None (foundational sprint)

### Exit Criteria
- [ ] [Testable criterion]
- [ ] [Testable criterion]

---

## Sprint 2: [Name]

**Status:** Not Started
**Goal:** [One sentence describing shippable outcome]

### Scope
- REQ-XXX-011 through REQ-XXX-020 ([Feature area])
- REQ-ZZZ-001 through REQ-ZZZ-015 ([Feature area])

### Dependencies
- Sprint 1 complete

### Exit Criteria
- [ ] [Testable criterion]
- [ ] [Testable criterion]

---

[Continue for all sprints]
```

**Key principles:**
- Scope references REQ codes, doesn't duplicate descriptions
- Each sprint has clear goal and exit criteria
- Dependencies are explicit
- Sprints are shippable increments

----------------------------------------------------------------------------
## Sprint-Discovery Output: Interview Findings
----------------------------------------------------------------------------

Document discoveries before handing to planning agent:

```markdown
## Sprint [X] Discovery Findings

**Date:** YYYY-MM-DD
**Scope:** REQ-XXX through REQ-YYY

### Key Clarifications

| Requirement | Clarification |
|-------------|---------------|
| REQ-XXX-001 | [What was clarified] |
| REQ-XXX-005 | [Edge case: when X happens, do Y] |

### Edge Cases Identified

1. **[Edge case name]**
   - Trigger: [What causes this]
   - Expected behavior: [What should happen]
   - Relevant REQs: REQ-XXX-001, REQ-XXX-002

2. **[Edge case name]**
   - Trigger: [What causes this]
   - Expected behavior: [What should happen]
   - Relevant REQs: REQ-XXX-010

### Integration Points

- [Module A] ↔ [Module B]: [Nature of integration]
- [External API]: [How we interact, constraints]

### Constraints Discovered

- [Constraint 1]: [Impact on implementation]
- [Constraint 2]: [Impact on implementation]

### Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Topic] | [What we chose] | [Why] |

### Open Questions for Planner

- [Question planning agent should address]
- [Question planning agent should address]
```

----------------------------------------------------------------------------
## Plan-Review Output: Approval or Revision
----------------------------------------------------------------------------

### If Approved

```markdown
## Plan Review: APPROVED

**Date:** YYYY-MM-DD
**Plan:** [Sprint X Implementation Plan]

### Review Notes
- [Any clarifications made during review]
- [Risks acknowledged]

### Proceed with execution.
```

### If Revision Needed

```markdown
## Plan Review: REVISION REQUESTED

**Date:** YYYY-MM-DD
**Plan:** [Sprint X Implementation Plan]

### Issues Identified

1. **[Issue]**
   - Problem: [What's wrong]
   - Requested change: [What should change]

2. **[Issue]**
   - Problem: [What's wrong]
   - Requested change: [What should change]

### Revision Scope
- [ ] [Specific change needed]
- [ ] [Specific change needed]

### Re-submit for review when revised.
```

----------------------------------------------------------------------------
## Clarify Output: Decision Record
----------------------------------------------------------------------------

For significant decisions that emerge from clarify interviews:

```markdown
## Decision: [Topic]

**Date:** YYYY-MM-DD
**Context:** [Why this decision was needed]

### Options Considered

1. **[Option A]**
   - Pros: [Benefits]
   - Cons: [Drawbacks]

2. **[Option B]**
   - Pros: [Benefits]
   - Cons: [Drawbacks]

3. **[Option C]**
   - Pros: [Benefits]
   - Cons: [Drawbacks]

### Decision

**Chosen:** [Option X]

**Rationale:** [Why this option was selected]

### Implications

- [What this means for implementation]
- [What this means for other requirements]

### Relevant Requirements

- REQ-XXX-001: [How this affects it]
- REQ-YYY-005: [How this affects it]
```

**Location:**
- Project-wide decisions: docs/decisions/ or PRD.md
- Sprint-specific decisions: Active sprint file

----------------------------------------------------------------------------
## Planning Agent Handoff Template
----------------------------------------------------------------------------

After sprint-discovery, hand off to planning agent with this structure:

```markdown
OBJECTIVE: Create implementation plan for Sprint [X]: [Name]

CONTEXT:
[Brief project context - 2-3 sentences]

INTERVIEW FINDINGS:
Key clarifications:
- REQ-XXX-001: [clarification]
- REQ-XXX-005: [edge case handling]

Edge cases to handle:
- [Edge case 1]: [expected behavior]
- [Edge case 2]: [expected behavior]

Constraints:
- [Constraint 1]
- [Constraint 2]

Decisions made:
- [Decision 1]: [choice and rationale]

SCOPE (from PRD):
- REQ-XXX-001: [brief description]
- REQ-XXX-002: [brief description]
- REQ-XXX-003: [brief description]
[List all REQ codes in this sprint's scope]

DEPENDENCIES:
- [What must exist before this sprint]
- [External dependencies]

INTEGRATION POINTS:
- [Module A] must integrate with [Module B]
- [Pattern to follow from existing code]

OUTPUT REQUIREMENTS:
- Task breakdown with clear deliverables
- Each task references relevant REQ codes
- Dependencies between tasks explicit
- No feature duplication - reference PRD
- Identify risks and mitigation
```

----------------------------------------------------------------------------
## Quick Reference: What Goes Where
----------------------------------------------------------------------------

| Finding Type | Location |
|--------------|----------|
| Feature requirements | PRD.md (REQ-XXX codes) |
| Sprint breakdown | SPRINT_PLAN.md |
| Sprint scope (REQ refs) | SPRINT_PLAN.md |
| Edge case clarifications | Sprint discovery doc → Planning agent handoff |
| Implementation decisions | Sprint file or docs/decisions/ |
| Integration notes | Planning agent handoff context |
| Constraints | Planning agent handoff context |
| Approved plan | Sprint implementation file |
| Revision requests | Plan review output |
