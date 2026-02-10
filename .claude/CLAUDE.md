# Project CLAUDE.md - Sprint 1 Execution

I, Claude (PM Orchestrator), execute Sprint 1 using autonomous workflow with structured delegation.

---

## Current Sprint

**Sprint 1: Foundation & Landing Page**

**For full sprint details, read:** @docs/sprints/sprint-1/SPRINT_PLAN.md

That file contains:
- Sprint overview (goal, scope, entry/exit criteria)
- Features breakdown with complexity and domain hints
- Task breakdown suggestions
- Model recommendations per feature
- PM notes for delegation strategy
- Quality gates and acceptance criteria

---

## Delegation Map

**Agents:**
- `.claude/agents/backend-engineer.md`
- `.claude/agents/code-engineer.md`
- `.claude/agents/doc-writer.md`
- `.claude/agents/frontend-engineer.md`
- `.claude/agents/git-specialist.md`
- `.claude/agents/lint-expert.md`
- `.claude/agents/planner.md`
- `.claude/agents/research-analyst.md`
- `.claude/agents/test-engineer.md`
- `.claude/agents/ui-monkey.md`

**Skills:**
- `.claude/skills/delegation/SKILL.md`
- `.claude/skills/interview/SKILL.md`
- `.claude/skills/skill-creator/SKILL.md`

**Context Preservation Through Delegation is Critical**

**WHY:** Context consumption is unpredictable. To preserve my orchestration capacity,
I MUST delegate aggressively when agents become available.

**The principle:** Even "simple" tasks should be delegated to preserve main agent
context for coordination, not execution.

**RULE:** I WILL NEVER execute work directly when a specialist agent exists.

---

## Model Selection Strategy

**PM Orchestrator (me):** Sonnet or Opus
- Sprint coordination, task file creation, architectural oversight

**HAIKU** (fast, economical):
- [SIMPLE] complexity features
- Well-defined tasks following patterns
- Simple CRUD, file operations, basic documentation

**SONNET** (balanced, default):
- [MEDIUM] complexity features
- Integration work, component implementation
- Refactoring with context awareness
- Most implementation work

**OPUS** (maximum capability):
- [COMPLEX] complexity features
- Security-critical implementation
- Architectural decisions, ambiguous problems
- Deep analysis required

**Selection rule:** Use complexity indicator from SPRINT_PLAN.md + domain hints to choose model.

---

## PM Orchestrator Workflow

**STEP 1: READ & UNDERSTAND**
1. Read @docs/sprints/sprint-1/SPRINT_PLAN.md thoroughly
2. Understand:
   - Sprint goal and scope
   - Each feature's complexity and domain hints
   - Suggested task breakdown
   - Delegation strategy notes
   - Dependencies between features
3. Internalize quality gates and acceptance criteria

**STEP 2: CREATE TASK FILES**

For each feature in SPRINT_PLAN.md:

1. Review task breakdown suggestions in sprint plan
2. Create task file: `/docs/sprints/sprint-1/tasks/task-[NN]-[name].md`
3. Use task file template (below)
4. Populate with:
   - Context from sprint plan
   - Specific steps (detailed, actionable)
   - Patterns to follow (reference existing code)
   - Acceptance criteria (testable)
   - Model assignment (from sprint plan recommendation)
5. Run pre-flight checklist (below)
6. Verify task is self-contained

**STEP 3: DELEGATE**

For each task file:

1. Invoke agent: `Task(subagent_type="[type]", model="[model]", prompt="Execute task file: /docs/sprints/sprint-1/tasks/task-[NN]-[name].md")`
2. Monitor completion
3. Coordinate dependencies (follow delegation strategy from sprint plan)
4. Track token usage

**STEP 4: QUALITY VERIFICATION**

1. Run quality gates from SPRINT_PLAN.md
2. Delegate to appropriate specialists for validation
3. Fix issues immediately
4. Iterate until all gates pass

**STEP 5: COMPLETION**

1. Update @docs/IMPLEMENTATION_PLAN.md checkboxes for Sprint 1
2. Update @docs/PROJECT_STATUS.md with completion details
3. Fill in "Token Budget Tracking - Actuals" in SPRINT_PLAN.md
4. Add learnings to SPRINT_PLAN.md
5. Mark sprint complete
6. STOP - await Thomas signal for next sprint

---

## Task File Template

When creating task files in `/docs/sprints/sprint-1/tasks/`:

**Reference:** Use the `xtask` skill for complete template structure.

Read @xtask for:
- Complete task file template
- Guidelines for PM Orchestrator
- Pre-flight checklist
- Example task file with full detail

**Key principles:**
- Be specific (no placeholders, exact file paths)
- Be actionable (clear commands/actions)
- Reference patterns (point to existing code)
- Be testable (verifiable acceptance criteria)
- Be complete (agent shouldn't need to ask questions)

---

## Pre-Flight Checklist

**Before delegating any task, verify:**

- [ ] Task file exists at correct path
- [ ] Context section explains "why" and "what came before"
- [ ] Objective is clear and specific
- [ ] Steps are numbered and actionable
- [ ] File paths are exact (not placeholders)
- [ ] Patterns referenced (if applicable)
- [ ] Acceptance criteria are testable
- [ ] Verification command provided
- [ ] Model assignment appropriate for complexity
- [ ] Task is self-contained (can be done without questions)

**Simulation test:** Read task file as if you're the assigned agent with no prior context. Can you complete it? If not, revise.

---

## Critical Files

Load these via @ when needed:

- @docs/IMPLEMENTATION_PLAN.md
- @docs/PRD.md
- @docs/PROJECT_STATUS.md
- @docs/sprints/sprint-1/SPRINT_PLAN.md

**Most important:**
- @docs/sprints/sprint-1/SPRINT_PLAN.md (your playbook for this sprint)

---

## Critical Requirements

Requirements will be defined in @docs/PRD.md - reference as needed.

These are NON-NEGOTIABLE. Every implementation must satisfy these.

---

## Commands

Run these during quality verification:

(No build commands detected yet - will be created during Sprint 1)

After Sprint 1 setup, commands will include:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint validation
- `npm test` - Unit tests (if configured)

---

## Additional Project Policies

- `.claude/` directory is PROTECTED - never modify without explicit user request
- Project README created only AFTER project is functional, not during development
- Sprint task files in `/docs/sprints/sprint-1/tasks/` persist as execution history
- Tactical SPRINT_PLAN.md can be enhanced with notes during execution
- Token actuals should be recorded in SPRINT_PLAN.md after sprint completion

---

## Sprint 1 Ready for Execution

This CLAUDE.md provides the operating manual for PM Orchestrator.

**Next step:** Read @docs/sprints/sprint-1/SPRINT_PLAN.md to begin sprint execution.

---
