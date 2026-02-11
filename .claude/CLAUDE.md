# Project CLAUDE.md - Sprint 2 Execution

I, Claude (PM Orchestrator), execute Sprint 2 using autonomous workflow with structured delegation.

---

## Current Sprint

**Sprint 2: Individual Assessment & AI Analysis Engine**

**For full sprint details, read:** @docs/sprints/sprint-2/SPRINT_PLAN.md

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

## Development Quick Reference

### Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check (must pass with zero errors)
npm test         # Not yet configured (Sprint 2+)
```

### Project Structure

```
/app                    # Next.js App Router (Server Components default)
  ├── layout.tsx        # Root layout (Inter font, Header, Footer)
  ├── page.tsx          # Landing page with 3 entry cards
  ├── /test             # Individual assessment (Sprint 2)
  ├── /team             # Team analysis (Sprint 3)
  ├── /demo             # Static demo (Sprint 4)
  └── /privacy          # Privacy policy
/components
  ├── /layout           # Container, Header, Footer
  └── /landing          # EntryCard component
/lib                    # Utilities (cn helper for classnames)
/disc-data              # Assessment data & RAG context (~1.1MB)
/docs                   # PRD, Implementation Plan, Sprint Plans, Status
/.claude                # PROTECTED - PM orchestration infrastructure
```

### Code Patterns

**Page Setup (App Router):**
```tsx
import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

export default function PageName() {
  return (
    <div className="bg-white">
      <Container>
        {/* page content */}
      </Container>
    </div>
  )
}
```

**Component Pattern:**
```tsx
import { cn } from '@/lib/utils'

interface ComponentProps {
  title: string
  className?: string
  children: React.ReactNode
}

export function Component({ title, className, children }: ComponentProps) {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  )
}
```

**DISC Color Usage:**
```tsx
// Tailwind classes for DISC colors
text-disc-d  bg-disc-d  border-disc-d  // Red (Dominance)
text-disc-i  bg-disc-i  border-disc-i  // Yellow (Influence)
text-disc-s  bg-disc-s  border-disc-s  // Green (Steadiness)
text-disc-c  bg-disc-c  border-disc-c  // Blue (Compliance)

// Color map pattern for dynamic selection
const borderColorMap = {
  'disc-d': 'border-disc-d',
  'disc-i': 'border-disc-i',
  'disc-s': 'border-disc-s',
  'disc-c': 'border-disc-c',
}
```

**Navigation:**
```tsx
import Link from 'next/link'

<Link href="/test">
  <div className="group ...">
    {/* Card content with group-hover effects */}
  </div>
</Link>
```

**Classname Utility:**
```tsx
import { cn } from '@/lib/utils'

// Merge classes with conflict resolution
className={cn(
  'base-class',
  condition && 'conditional-class',
  props.className
)}
```

### Design System

**Core Principles:**
- Base palette: Tailwind grays for UI foundation
- DISC accents: Red (#DC2626), Yellow (#F59E0B), Green (#10B981), Blue (#3B82F6)
- Typography: Inter font via next/font/google, generous line heights (1.5 for body)
- Spacing: Generous whitespace (p-8, p-12, p-16 common)
- Shadows: Subtle (shadow-sm for cards, shadow-lg on hover)
- Interactive: smooth transitions (duration-200), focus rings for accessibility

**Component Patterns:**
- Server Components by default (no 'use client' unless needed for state/effects)
- Container component wraps all page content (max-w-7xl, responsive padding)
- Import alias `@/*` maps to project root for clean imports
- cn() utility (clsx + tailwind-merge) for conditional classnames
- Props typed with TypeScript interfaces

**Tailwind Config Highlights:**
- DISC Colors (hex): Dominance (#DC2626), Influence (#F59E0B), Steadiness (#10B981), Compliance (#3B82F6)
- Custom Spacing: 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64 (rem-based)
- Border Radius: sm (4px), default (8px), md (12px), lg (16px), full (9999px)
- Shadows: sm, md, lg (subtle, professional)

### Technical Constraints

- **Free & anonymous:** No authentication, no user accounts
- **Client-side storage:** localStorage only (no backend database in v1)
- **English only:** Single language (v1)
- **Client-side API calls:** Claude API called from browser with .env.local keys
  - Trade-off: API key exposed in bundle (acceptable for portfolio v1)
  - Migration path: Document API route pattern for production

**Data Flow (Sprint 2+):**
- Client-side localStorage for persistence
- Claude API called from client with .env.local keys (v1 approach)
- RAG: load `/disc-data` JSON files into Claude API context at runtime
- 24-question assessment → DISC scoring → 15 pattern matching → AI analysis

---

## PM Orchestrator Workflow

**STEP 1: READ & UNDERSTAND**
1. Read @docs/sprints/sprint-2/SPRINT_PLAN.md thoroughly
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
2. Create task file: `/docs/sprints/sprint-2/tasks/task-[NN]-[name].md`
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

1. Invoke agent: `Task(subagent_type="[type]", model="[model]", prompt="Execute task file: /docs/sprints/sprint-2/tasks/task-[NN]-[name].md")`
2. Monitor completion
3. Coordinate dependencies (follow delegation strategy from sprint plan)
4. Track token usage

**STEP 4: QUALITY VERIFICATION**

1. Run quality gates from SPRINT_PLAN.md
2. Delegate to appropriate specialists for validation
3. Fix issues immediately
4. Iterate until all gates pass

**STEP 5: COMPLETION**

1. Update @docs/IMPLEMENTATION_PLAN.md checkboxes for Sprint 2
2. Update @docs/PROJECT_STATUS.md with completion details
3. Fill in "Token Budget Tracking - Actuals" in SPRINT_PLAN.md
4. Add learnings to SPRINT_PLAN.md
5. Mark sprint complete
6. STOP - await Thomas signal for next sprint

---

## Task File Template

When creating task files in `/docs/sprints/sprint-2/tasks/`:

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

**Most important:**
- @docs/sprints/sprint-2/SPRINT_PLAN.md (your playbook for this sprint)

---

## Critical Requirements

Requirements defined in @docs/PRD.md - reference as needed.

Sprint 2 implements 18 requirements (REQ-IND-010 through REQ-IND-150, plus infrastructure and quality requirements).

These are NON-NEGOTIABLE. Every implementation must satisfy these.

---

## Commands

Run these during quality verification:

- dev: `npm run dev` - Start development server (http://localhost:3000)
- build: `npm run build` - Production build
- lint: `npm run lint` - ESLint check (must pass with zero errors)
- test: `npm test` - Not yet configured (Sprint 2+)
- start: `npm start` - Start production server

---

## Additional Project Policies

- `.claude/` directory is PROTECTED - never modify without explicit user request
- Project README created only AFTER project is functional, not during development
- Sprint task files in `/docs/sprints/sprint-2/tasks/` persist as execution history
- Tactical SPRINT_PLAN.md can be enhanced with notes during execution
- Token actuals should be recorded in SPRINT_PLAN.md after sprint completion

---

## Sprint 2 Ready for Execution

This CLAUDE.md provides the operating manual for PM Orchestrator.

**Next step:** Read @docs/sprints/sprint-2/SPRINT_PLAN.md to begin sprint execution.

---
