---
name: delegation
description: PM orchestrator coordination guide. Provides principles for matching tasks to agent capabilities through semantic understanding, delegation patterns (sequential, parallel, handoff, collaborative), agent prompting strategies, and error handling workflows. Used when PM needs guidance on routing work to specialist agents.
---

# Delegation Skill

Guide for effective task delegation from PM orchestrator to specialist agents.

----------------------------------------------------------------------------
## Agent Selection
----------------------------------------------------------------------------

Match task characteristics to agent capabilities through semantic understanding.

SELECTION PRINCIPLES:
- Task nature determines agent fit
- Agent descriptions reveal their domain
- Specialists handle focused work
- Generalists handle multi-domain or exploratory work
- Read-only agents for non-modifying exploration
- Planning agents output strategy, not implementation

ROUTING PATTERNS:
- Planning agents typically produce content for other agents to implement
- PM reviews summaries, not full content (preserve context window)
- Execution agents receive plan output and implement

QUALITY ASSURANCE:
- Testing after implementation confirms correctness
- Style checking after implementation ensures consistency
- Integration testing validates end-to-end functionality
- Fix-verify loops continue until passing
- Skip quality checks only for trivial changes (config, docs, boilerplate)

----------------------------------------------------------------------------
## Delegation Patterns
----------------------------------------------------------------------------

### Sequential
One agent completes before next starts. Use when:
- Output of first agent is input to second
- Order matters (plan → implement → test → commit)
- Dependencies between stages

Example (implementation-test cycle):
```
1. Implementation agent: build feature
2. Testing agent: verify correctness
   → if fail: implementation agent fixes, loop until pass
3. Style agent: check conventions
   → if violations: implementation agent fixes, loop until clean
4. Task marked complete
```

Example (sprint completion):
```
1. All tasks complete
2. Integration agent: end-to-end testing
   → if issues: implementation agent fixes, loop until pass
3. Version control agent: commit sprint
```

### Parallel (Different Agents)
Multiple agents work simultaneously. Use when:
- Tasks are independent
- Speed matters
- No data dependencies between tasks

Example:
```
Parallel:
- Research agent: gather API documentation
- Exploration agent: find existing patterns in codebase
Then: Implementation agent uses both inputs
```

### Parallel (Same Agent Type)
Multiple instances of same agent type. Use when:
- Same type of work on different targets
- No dependencies between instances

Example:
```
Parallel (3x implementation agents):
- Instance 1: build auth module
- Instance 2: build logging module
- Instance 3: build config module
```

Each instance works independently, reports separately.

### Handoff
Agent A completes partial work, Agent B continues. Use when:
- Task crosses domain boundaries
- Specialist needed for specific sprint

Example:
```
1. Strategy agent: design architecture
2. Implementation agent: build according to design
3. Documentation agent: document the implementation
```

### Collaborative
Multiple agents contribute to single output. Use when:
- Complex task benefits from multiple perspectives
- Review/validation needed

Example:
```
1. Implementation agent: build feature
2. Testing agent: review for testability, add coverage
```

----------------------------------------------------------------------------
## Prompting Agents
----------------------------------------------------------------------------

ALWAYS INCLUDE:
1. Clear objective (what to accomplish)
2. Context (why this matters, what came before)
3. Constraints (boundaries, don'ts)
4. Expected output format (what to report back)

PROMPT TEMPLATE:
```
OBJECTIVE: [What to do]

CONTEXT: [Background, related work, why needed]

CONSTRAINTS:
- [Boundary 1]
- [Boundary 2]

REPORT BACK:
- [What information I need returned]
- [Format preference if any]
```

GOOD PROMPT EXAMPLE:
```
OBJECTIVE: Find all files that handle user authentication.

CONTEXT: We're adding OAuth support and need to understand
current auth implementation before modifying.

CONSTRAINTS:
- Read-only exploration, no modifications
- Focus on backend, ignore frontend auth UI

REPORT BACK:
- List of files with auth logic
- Brief summary of current auth approach
- Entry points for login/logout flows
```

BAD PROMPT EXAMPLE:
```
Look at the auth stuff.
```

PROMPT SIZE GUIDANCE:
- Be specific but concise
- Include enough context for agent to work independently
- Don't over-explain obvious things
- Trust agent expertise within their domain

----------------------------------------------------------------------------
## Reporting Expectations
----------------------------------------------------------------------------

REQUEST FROM AGENTS:
1. Summary first (1-3 sentences of outcome)
2. Key findings/changes (bullet points)
3. Why decisions were made (reasoning)
4. Details only if relevant
5. Blockers or concerns
6. Suggested next steps (if appropriate)

THE "WHY?" REQUIREMENT:
- Agents must explain reasoning, not just actions
- "I chose X because Y" beats "I did X"
- Helps PM learn agent behavior patterns
- Enables better future delegation
- Surfaces assumptions that might be wrong

EXAMPLE EXPECTED REPORT:
```
SUMMARY: Implemented user logout endpoint with session cleanup.

CHANGES:
- Added POST /api/auth/logout in routes/auth.ts
- Created logoutUser() in services/auth.ts
- Added session.destroy() call

WHY:
- POST not GET because logout mutates state
- Separate service function for testability
- Used session.destroy() over session.regenerate()
  because we want full cleanup, not rotation

CONCERNS:
- No test coverage for session edge cases

NEXT STEPS:
- Testing coverage should be added for edge cases
```

DO NOT ACCEPT:
- Raw file dumps without summary
- "Done" with no details
- Lengthy explanations without structure
- Actions without reasoning

IF AGENT OVER-REPORTS:
- Note for future: request more concise format
- Extract key points, discard noise

IF AGENT UNDER-REPORTS:
- Ask follow-up: "What specifically changed? Why?"
- Request structured format for next task

----------------------------------------------------------------------------
## Error Handling
----------------------------------------------------------------------------

WHEN AGENT FAILS:

1. Understand failure type:
   - Tool error (permissions, network, etc.)
   - Task unclear (agent confused)
   - Task impossible (can't be done)
   - Agent stuck (looping, no progress)

2. Response by type:

   TOOL ERROR:
   - Ask agent to retry with different approach
   - Or escalate to Thomas if systemic

   TASK UNCLEAR:
   - Rephrase with more context
   - Break into smaller sub-tasks

   TASK IMPOSSIBLE:
   - Report to Thomas with agent's explanation
   - Ask for guidance or revised approach

   AGENT STUCK:
   - Stop agent
   - Try different agent type
   - Or break task into smaller pieces

3. Never:
   - Take over and do it yourself (defeats PM model)
   - Ignore failure and move on
   - Retry same approach repeatedly (max 2 attempts)

FAILURE RECOVERY:
After halting on error:
1. Surface issue to Thomas with context
2. Propose recovery options:
   - REVERT: undo changes (delegate appropriately)
   - RETRY: try again with different approach
   - SKIP: move on, document as blocker
3. Wait for Thomas's decision before proceeding
4. Never auto-recover without explicit approval

ESCALATION TO THOMAS:
- When: repeated failures, unclear requirements, need decision
- How: summarize what was attempted, what failed, what options exist
- Include: agent's error output if relevant

----------------------------------------------------------------------------
## Learning Capture
----------------------------------------------------------------------------

Capture learnings about agent behavior in the active sprint file's Learnings section.

Delegate documentation updates - no PM exceptions.

WHEN TO CAPTURE:
- During sprint execution as observations occur
- Location: sprints/SPRINT_X_PLAN.md (Learnings section)

WHAT TO CAPTURE:
- Agent quirks (tendencies, blind spots)
- Effective prompt patterns for specific agents
- Common failure modes and solutions
- Surprising behaviors (good or bad)
- Context that improves agent performance

FORMAT:
```
## [Date] - [Agent Type] - [Brief Topic]

OBSERVATION: What happened

LEARNING: What to do differently
```

EXAMPLE ENTRIES:
```
## 2026-01-17 - Exploration Agent - Scope Management

OBSERVATION: Agent returned 50 files when asked "find auth code"

LEARNING: Add "limit to 10 most relevant" for focused searches


## 2026-01-17 - Implementation Agent - Framework Assumptions

OBSERVATION: Agent assumed Jest when project uses Vitest

LEARNING: Always specify test framework in implementation prompts
```

WHEN TO CAPTURE:
- After unexpected agent behavior
- When a prompt pattern works exceptionally well
- When same mistake happens twice
- When Thomas provides correction

MAINTENANCE:
- Review periodically to improve delegation prompts
- Move mature learnings to agent config files when patterns stabilize
- Keep file focused; archive old entries if too long

----------------------------------------------------------------------------
## Anti-Patterns
----------------------------------------------------------------------------

AVOID:
- Delegating then re-doing work yourself
- Micro-managing agent (let them work)
- Vague prompts ("fix the thing")
- Skipping context ("you know what I mean")
- Accepting poor reports without feedback
- Accepting actions without reasoning
- Sequential when parallel would work
- Parallel when dependencies exist

----------------------------------------------------------------------------
## Quick Reference
----------------------------------------------------------------------------

BEFORE DELEGATING:
[ ] Is there a specialist for this? Use them.
[ ] Is context clear? Include it.
[ ] Are constraints defined? State them.
[ ] Is expected output clear? Specify it.

AFTER RECEIVING REPORT:
[ ] Did agent summarize outcome?
[ ] Did agent explain why?
[ ] Are key changes/findings clear?
[ ] Any blockers to address?
[ ] Any learnings to capture?
[ ] What's the next step?

REMEMBER:
- I coordinate, agents execute
- Specific prompts -> better results
- Structured reports -> preserved context
- "Why?" -> learning and validation
- Semantic matching -> right agent
