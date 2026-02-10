---
name: interview
description: PM orchestrator discovery conversation guide. Structures interviews with users to gather requirements, clarify scope, review plans, and resolve ambiguities. Covers four interview types (kickoff, sprint-discovery, plan-review, clarify), question strategies, research delegation, and documentation handoff. Used when PM needs to conduct structured discovery before planning or during review cycles.
---

# Interview Skill

Structured discovery conversations that feed quality inputs to planning.

----------------------------------------------------------------------------
## Interview Types
----------------------------------------------------------------------------

### 1. KICKOFF (New Project)

**When:** Starting new project, no PRD exists or PRD is skeletal.

**Purpose:** Establish vision, goals, constraints, feature scope.

**Depth:** Deep - exhaustive understanding of project vision.
Follow PM philosophy: pick 1-2 angles, exhaust them completely.

**Research first:** Usually no (greenfield). If extending existing system,
delegate to exploration agent first.

**Flow:**
```
1. Open with "why" - understand the problem being solved
2. Identify primary angle of attack (UX? data model? integration?)
3. Confirm angle with user before diving deep
4. Exhaust the angle - keep drilling until no unknowns remain
5. Let secondary concerns emerge from primary understanding
6. Capture features as requirement statements
7. Identify natural sprint boundaries
8. Document findings
```

**Output:**
- PRD.md populated with REQ-XXX requirements
- SPRINT_PLAN.md with sprint breakdown (references REQ codes, no duplication)

**Question focus:**
- Why is this project needed?
- What problem does it solve?
- Who are the users?
- What does success look like?
- What are the hard constraints?
- What's explicitly out of scope?

---

### 2. SPRINT-DISCOVERY (Before Sprint Starts)

**When:** About to begin a sprint, need deeper understanding of that sprint's scope.

**Purpose:** Clarify edge cases, acceptance criteria, dependencies, integration points.

**Depth:** Deep - exhaustive for this sprint's REQ codes specifically.
We already have high-level understanding from kickoff; now we go deeper.

**Research first:** YES - delegate to exploration agent:
```
OBJECTIVE: Explore codebase for context on [sprint scope]

CONTEXT: About to begin Sprint X covering [REQ codes].
Need to understand what exists before interviewing user.

LOOK FOR:
- Existing code related to these features
- Integration points with other modules
- Patterns to follow or break from
- Potential technical constraints

REPORT BACK:
- Summary of relevant existing code
- Key integration points
- Patterns observed
- Questions this raises for the user
```

**Flow:**
```
1. Delegate research to exploration agent (see above)
2. Review exploration findings
3. Interview user with informed questions
4. Focus on: edge cases, acceptance criteria, dependencies
5. Clarify anything ambiguous in the REQ codes
6. Document sprint-specific discoveries
7. Hand off to planning agent with findings
```

**Output:**
- Deeper understanding documented
- Feeds into planning agent prompt as context

**Question focus:**
- For REQ-XXX, what happens when [edge case]?
- What's the acceptance criteria for this feature?
- How should this integrate with [existing code]?
- Any dependencies on external systems?
- What can we simplify or defer?

---

### 3. PLAN-REVIEW (After Planner Returns)

**When:** Planning agent delivered a plan, needs discussion before approval.

**Purpose:** Discuss plan, identify gaps, ensure alignment with intent.

**Depth:** Focused - on plan completeness and requirement coverage.

**Research first:** No (reviewing planning agent output, not codebase).

**Flow:**
```
1. Present plan summary to user
2. Walk through key decisions planning agent made
3. Check requirement coverage (all REQ codes addressed?)
4. Identify gaps or misalignments
5. Discuss trade-offs planning agent surfaced
6. Either approve or request revision
7. If revision needed, clarify what should change
8. Iterate until plan is approved
```

**Output:**
- Approved plan, OR
- Revision requests with specific guidance

**Question focus:**
- Does this breakdown match your mental model?
- Planner chose X approach - does that align with intent?
- I notice REQ-XXX isn't explicitly covered - is that intentional?
- Any concerns with the proposed sequence?
- What would make you more confident in this plan?

---

### 4. CLARIFY (Ad-hoc)

**When:** Specific ambiguity or decision point during work.

**Purpose:** Resolve single issue, get unstuck.

**Depth:** Narrow - focused on one question.

**Research first:** Depends - if technical question, may explore first.

**Flow:**
```
1. State the specific ambiguity
2. Present options if known
3. Get decision
4. Document decision
5. Continue work
```

**Output:**
- Documented decision in appropriate location

**Question focus:**
- We've hit [specific issue]. Options are A, B, C. Which fits your intent?
- The requirement says X, but in practice Y happens. How should we handle?

----------------------------------------------------------------------------
## Question Strategy
----------------------------------------------------------------------------

### When to Use AskUserQuestion Tool

Use for **decision points** with clear, bounded options:

- Binary choices: "Should we support feature X? Yes/No"
- Few-option decisions: "Auth method: JWT, Session, or OAuth?"
- Confirming priorities: "Priority order: A > B > C. Correct?"
- Choosing exploration angle: "Dive into data model or UX flow first?"
- Quick validation: "This matches your intent?"

**AskUserQuestion strengths:**
- Clear structure
- Easy to answer
- Forces you to articulate options
- Good UX

**Limitations:**
- Max 4 options per question
- Not good for open-ended exploration
- Can feel rigid

### When to Use Conversational Questions

Use for **discovery** where answers aren't bounded:

- Open-ended "why": "Why is this feature important?"
- Following threads: "Tell me more about the user journey"
- Complex exploration: "Walk me through a typical scenario"
- Understanding intent: "What problem does this solve?"
- Building mental model: "How do you think about X?"

**Conversational strengths:**
- Flexible, adaptive
- Can follow unexpected threads
- Builds deeper understanding
- Natural dialogue

### Hybrid Approach

Often the best approach combines both:

```
1. Open conversationally - understand the space
2. Narrow to options - use AskUserQuestion for decisions
3. Deepen conversationally - explore the chosen path
4. Confirm with AskUserQuestion - validate understanding
```

----------------------------------------------------------------------------
## Research Delegation
----------------------------------------------------------------------------

### When to Research First

**Always before sprint-discovery:**
The more you know about existing code, the better your questions.

**Sometimes before kickoff:**
Only if extending existing system and context would help.

**Never before plan-review:**
You're reviewing planning agent output, not codebase.

**Sometimes before clarify:**
If the question is technical and exploration would inform options.

### Exploration Prompt Template

```
OBJECTIVE: Gather context for upcoming interview about [topic]

CONTEXT: [Why this exploration is needed]

LOOK FOR:
- [Specific things to find]
- [Patterns to identify]
- [Integration points]

CONSTRAINTS:
- Read-only exploration
- Focus on [scope boundary]
- Limit to most relevant [N] items

REPORT BACK:
- Summary of findings
- Questions this raises for user interview
- Any concerns or blockers identified
```

### Using Exploration Results

Don't dump raw findings on user. Instead:

1. Synthesize: What does this tell us?
2. Identify gaps: What questions does this raise?
3. Inform questions: "I see pattern X in the code - should we follow it?"
4. Surface concerns: "The existing code assumes Y - is that still valid?"

----------------------------------------------------------------------------
## Documentation & Handoff
----------------------------------------------------------------------------

### Output Locations

| Interview Type | Primary Output | Secondary Output |
|----------------|----------------|------------------|
| Kickoff | PRD.md (requirements) | SPRINT_PLAN.md (sprint refs) |
| Sprint-Discovery | Planner prompt context | Sprint file notes |
| Plan-Review | Approved/revised plan | - |
| Clarify | Inline decision doc | Sprint file if significant |

### PRD.md vs SPRINT_PLAN.md

**CRITICAL: Single source of truth for features**

- PRD.md owns ALL feature requirements (REQ-XXX codes)
- SPRINT_PLAN.md REFERENCES requirements, does not duplicate them

**Correct:**
```markdown
## Sprint 2: Core Gameplay

### Scope
- REQ-ENGINE-015 through REQ-ENGINE-025 (Hand evaluation)
- REQ-ENGINE-040 through REQ-ENGINE-050 (Player actions)

### Notes
- Hand evaluation must complete before action resolution
- See PRD for detailed requirements
```

**Incorrect:**
```markdown
## Sprint 2: Core Gameplay

### Features
- Calculate hand totals with soft/hard logic
- Implement hit, stand, double, split actions
- Handle blackjack detection and payouts
```

The incorrect version duplicates PRD content and will drift.

### Planner Handoff

After interview, delegate to planning agent with:

```
OBJECTIVE: Create implementation plan for [sprint/feature]

CONTEXT:
[Brief background]

INTERVIEW FINDINGS:
[Key discoveries from interview - summarized, not raw transcript]
- User confirmed X
- Edge case Y should be handled by Z
- Constraint: [specific constraint]

SCOPE (from PRD):
- REQ-XXX: [brief description]
- REQ-YYY: [brief description]
[List all relevant requirements]

CONSTRAINTS:
- [Technical constraints from interview]
- [Business constraints]
- [Dependencies]

OUTPUT REQUIREMENTS:
- Task breakdown with clear deliverables
- Dependencies between tasks
- Each task references relevant REQ codes
- No feature descriptions - reference PRD
```

### Documenting Decisions

When interview surfaces important decisions:

```markdown
## Decision: [Topic]
**Date:** YYYY-MM-DD
**Context:** [Why this came up]
**Options considered:**
1. [Option A] - [trade-offs]
2. [Option B] - [trade-offs]
**Decision:** [What was chosen]
**Rationale:** [Why]
```

Location: Sprint file for sprint-specific, PRD for project-wide.

----------------------------------------------------------------------------
## Quick Reference
----------------------------------------------------------------------------

### Interview Type Selection

```
New project, no PRD?           → KICKOFF
Starting a sprint?             → SPRINT-DISCOVERY
Planner returned a plan?       → PLAN-REVIEW
Stuck on specific question?    → CLARIFY
```

### Question Type Selection

```
Clear bounded options?         → AskUserQuestion
Open-ended exploration?        → Conversational
Need to narrow down?           → Conversational → AskUserQuestion
Need to validate?              → AskUserQuestion
```

### Research Delegation

```
Sprint-discovery?              → Always explore first
Technical clarify?             → Consider exploring first
Kickoff for existing system?   → Consider exploring first
Plan-review?                   → Never (reviewing plan, not code)
```

### Checklist Before Ending Interview

- [ ] All questions from exploration addressed?
- [ ] Core "why" understood?
- [ ] Edge cases identified?
- [ ] Constraints documented?
- [ ] Ready to hand off to planning agent (or work)?
- [ ] Output documented in correct location?
