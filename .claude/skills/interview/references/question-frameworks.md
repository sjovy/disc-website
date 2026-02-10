# Question Frameworks

Question banks and sequencing patterns for each interview type.

----------------------------------------------------------------------------
## Kickoff Interview Questions
----------------------------------------------------------------------------

### Opening (Why)

Start here. Don't skip to "what" until "why" is clear.

```
- Why is this project needed? What problem does it solve?
- Why now? What triggered this?
- Why you/your team? What unique perspective do you bring?
- Why not [obvious alternative]? What's wrong with existing solutions?
```

### Vision & Goals

```
- What does success look like in 6 months? 1 year?
- If this project succeeds wildly, what changed?
- What's the minimum viable version?
- What would make this a failure even if "complete"?
```

### Users & Context

```
- Who are the primary users?
- What are they doing today without this?
- What pain are they experiencing?
- What's their technical sophistication?
- Are there secondary users we should consider?
```

### Scope & Constraints

```
- What's explicitly OUT of scope?
- What are the hard technical constraints?
- What can't change? (existing systems, APIs, data formats)
- What's the budget/resource reality?
- Any regulatory or compliance requirements?
```

### Angle Selection

After initial context, choose angle to go deep:

```
- The problem you described seems to center on [X]. Should we start there?
- I see two main angles: [data model] or [user journey]. Which matters more?
- Let's exhaust [chosen angle] before moving on. Agreed?
```

### Feature Discovery

Once angle is chosen, drill deep:

```
- Walk me through a complete user scenario.
- What happens when [edge case]?
- What if [failure scenario]?
- What data needs to persist?
- What actions trigger what state changes?
- Where does this integrate with external systems?
```

### Sprint Boundaries

After features emerge:

```
- What would be a shippable first milestone?
- What features depend on what?
- What's foundational vs. additive?
- If we could only ship half, which half?
```

----------------------------------------------------------------------------
## Sprint-Discovery Questions
----------------------------------------------------------------------------

### Context Check

Verify understanding before diving deep:

```
- This sprint covers [REQ codes]. Is that still accurate?
- Any changes since we scoped this sprint?
- Any new constraints I should know about?
```

### Edge Cases

For each requirement in scope:

```
- For REQ-XXX, what happens when [boundary condition]?
- What if user does [unexpected action]?
- What if [external dependency] fails?
- What's the error state? How do we recover?
- What's the maximum/minimum [relevant quantity]?
```

### Acceptance Criteria

```
- How will we know REQ-XXX is done?
- What's the test scenario that proves it works?
- What's the performance expectation?
- Any specific UX requirements?
```

### Integration

After exploration findings:

```
- I found [existing pattern X]. Should we follow it?
- [Module Y] already does [thing]. Should we integrate or duplicate?
- [Code Z] assumes [assumption]. Still valid?
- The interface between [A] and [B] seems unclear. What's the contract?
```

### Dependencies

```
- What needs to be done before this sprint can start?
- What does this sprint block?
- Any external dependencies (APIs, services, data)?
- Who else needs to be involved?
```

### Simplification

```
- Can we simplify REQ-XXX for this sprint and enhance later?
- Is [feature Y] truly needed now or can it wait?
- What's the 80/20 here - which 20% delivers 80% of value?
```

----------------------------------------------------------------------------
## Plan-Review Questions
----------------------------------------------------------------------------

### Alignment Check

```
- Does this breakdown match how you think about the work?
- Any task groupings that feel wrong?
- Does the sequence make sense?
```

### Coverage

```
- I notice REQ-XXX isn't explicitly in any task. Intentional?
- Is [task Y] actually covering [requirements Z]?
- Anything missing that should be here?
```

### Trade-offs

```
- Planning agent chose [approach A] over [approach B]. Thoughts?
- This plan optimizes for [X]. Is that right?
- Planning agent flagged [concern]. How should we address it?
```

### Risk

```
- What's the riskiest part of this plan?
- What could go wrong?
- Any tasks that might take longer than expected?
- Any dependencies that might slip?
```

### Confidence

```
- What would make you more confident in this plan?
- Any areas where you'd want more detail?
- Anything that feels hand-wavy?
```

### Approval

```
- Ready to proceed, or should we revise?
- If revising, what specifically should change?
```

----------------------------------------------------------------------------
## Clarify Questions
----------------------------------------------------------------------------

### Framing

```
- We've hit [specific issue] that blocks progress.
- The requirement says [X], but [Y] is happening.
- I see multiple valid approaches and need direction.
```

### Options Presentation

```
- Option A: [description] - trade-off: [trade-off]
- Option B: [description] - trade-off: [trade-off]
- Option C: [description] - trade-off: [trade-off]
- Which aligns with your intent?
```

### Quick Validation

```
- My understanding is [X]. Correct?
- Should we prioritize [A] over [B]?
- Is [edge case] in scope or out?
```

----------------------------------------------------------------------------
## Question Sequencing Patterns
----------------------------------------------------------------------------

### Funnel Pattern

Broad → Narrow → Specific

```
1. "What problem does this solve?" (broad)
2. "Who experiences this problem most?" (narrower)
3. "Walk me through their current workflow" (specific)
4. "What happens at step 3 when X fails?" (very specific)
```

### Thread-Exhaust Pattern

Follow one thread to completion before branching:

```
1. Identify primary thread
2. Keep asking "and then?" or "what if?"
3. Only branch when thread is exhausted
4. Mark completed threads mentally
5. Return to capture any missed threads
```

### Validate-Deepen Pattern

Confirm before going deeper:

```
1. "So the core issue is [X]?"
2. [Confirmation]
3. "Let's go deeper on [X]. What about [specific aspect]?"
4. Repeat until exhausted
```

### Options-Explore Pattern

For decisions with multiple paths:

```
1. "I see options A, B, C. Which resonates?"
2. [User picks B]
3. "Let's explore B. What about [B-specific question]?"
4. Don't revisit A and C unless B fails
```

----------------------------------------------------------------------------
## Anti-Patterns to Avoid
----------------------------------------------------------------------------

### Too Broad

Bad: "Tell me about the project."
Better: "What problem triggered this project?"

### Too Many at Once

Bad: "What's the scope, timeline, budget, team, and tech stack?"
Better: "What's the core problem we're solving?" (then sequence)

### Leading

Bad: "You want to use React, right?"
Better: "What's driving your frontend technology choice?"

### Premature Options

Bad: "Should we use JWT or session auth?" (before understanding needs)
Better: "What are the auth requirements?" (then offer options)

### Abandoning Threads

Bad: Moving on when answer is unclear
Better: "I want to make sure I understand. You said [X]. Does that mean [Y]?"

### Skipping Why

Bad: "What features do you want?" (immediately)
Better: "Why is this project important?" (first)
