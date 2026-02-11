# Project CLAUDE.md - Sprint 2B Execution

I, Claude (PM Orchestrator), execute Sprint 2B using autonomous workflow with structured delegation.

---

## Current Sprint

**Sprint 2B: AI Analysis & Visualization**

**Context:** Sprint 2A (Core Assessment Flow) is COMPLETE. Sprint 2B adds AI integration and results visualization.

**For full sprint details, read:** @docs/sprints/sprint-2/SPRINT_PLAN.md

That file contains:
- Sprint overview (goal, scope, entry/exit criteria)
- Features breakdown with complexity and domain hints
- Task breakdown suggestions
- Model recommendations per feature
- PM notes for delegation strategy
- Quality gates and acceptance criteria

**Sprint 2B Scope (from SPRINT_PLAN.md):**
- Feature 3: Results Visualization (Recharts, charts, export, print)
- Feature 4: AI Analysis Integration (RAG, Claude API, streaming, error handling)

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
npm test         # Run Vitest unit tests
```

### Project Structure

```
/app                    # Next.js App Router (Server Components default)
  ├── layout.tsx        # Root layout (Inter font, Header, Footer)
  ├── page.tsx          # Landing page with 3 entry cards
  ├── /test             # Individual assessment (Sprint 2A COMPLETE)
  ├── /team             # Team analysis (Sprint 3)
  ├── /demo             # Static demo (Sprint 4)
  └── /privacy          # Privacy policy
/components
  ├── /layout           # Container, Header, Footer
  ├── /landing          # EntryCard component
  └── /assessment       # QuestionCard, ProgressBar (Sprint 2A)
/lib                    # Utilities (cn helper for classnames)
  ├── /assessment       # Data loading, validation (Sprint 2A)
  ├── /scoring          # DISC scoring engine (Sprint 2A - COMPLETE)
  └── /storage          # localStorage persistence (Sprint 2A)
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

**Data Flow (Sprint 2B):**
- Client-side localStorage for persistence (Sprint 2A COMPLETE)
- Claude API called from client with .env.local keys (Sprint 2B)
- RAG: load `/disc-data` JSON files into Claude API context at runtime
- 24-question assessment → DISC scoring → 15 pattern matching → AI analysis

### DISC Scoring Architecture

The scoring engine is the core business logic (Sprint 2A COMPLETE):

**Pure Function Design:**
- No side effects, deterministic, testable
- All functions in `/lib/scoring/*` are pure

**Scoring Flow:**
```typescript
import { scoreAssessment } from '@/lib/scoring'

const answers = new Map([
  [1, { most: 'B', least: 'A' }],
  // ... 24 questions
])

const result = scoreAssessment(answers)
// result.scores: { D: 18, I: 12, S: 6, C: 8 }
// result.pattern: { name: 'Developer', primary: 'D', ... }
```

**Algorithm Summary:**
- Each "Most" selection adds +1 to mapped dimension (D/I/S/C)
- "Least" contributes 0 points
- Scores range 0-24 per dimension
- Pattern determination uses midline threshold (16 points = 65% of 24)
- 15 possible patterns (4 pure + 8 combination + 2 triple-high + 1 balanced)

**Testing:**
- 41 unit tests in `/lib/scoring/*.test.ts`
- 100% coverage of all 15 patterns + edge cases
- Run with `npm test`

### localStorage Persistence

**Keys:**
- `disc-assessment-progress` - In-progress answers (auto-save with 500ms debounce)
- `disc-assessment-results` - Completed results with timestamp

**API:**
```typescript
import { saveProgress, loadProgress, clearProgress } from '@/lib/storage/persistence'

// Save in-progress answers (called on every change)
saveProgress(answers)  // returns boolean (success/failure)

// Load on page mount
const saved = loadProgress()  // returns StoredAnswer | null

// Clear (used by "Start Over" button)
clearProgress()
```

**Error Handling:**
- Quota exceeded (DOMException) handled gracefully
- Errors logged to console.warn (non-blocking)
- UI shows yellow warning banner if saves fail

### TypeScript Configuration

**Strict Mode Enabled:**
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true  // CRITICAL: prevents undefined access errors
}
```

**Impact:**
- All array/object access must check for undefined
- Pattern: `const value = obj[key]` → `value` is `Type | undefined`
- Use optional chaining: `obj?.key`, nullish coalescing: `obj[key] ?? fallback`, or type guards

**Testing Types:**
- Vitest configured with `@/*` alias matching main app
- Import types from `/lib/**/types.ts` files

### Data Sources

**Assessment Data (`/disc-data`):**
- Loaded via static import: `import data from '@/disc-data/filename.json'`
- ~1.1MB total across all files
- Used for: questions, scoring key, pattern definitions, AI RAG context

**Sprint 2B:** AI integration will load DISC theory files into Claude API context for RAG pattern.

### Development Workflow

1. **Start dev server:** `npm run dev`
2. **Make changes** (follow patterns above)
3. **Check types:** TypeScript errors appear in editor
4. **Lint:** `npm run lint` (must pass with zero errors)
5. **Test:** `npm test` (if modifying scoring logic)
6. **Build:** `npm run build` (verifies production compilation)

### Common Gotchas

- **Client vs Server Components:** Use `'use client'` directive ONLY when you need state (`useState`), effects (`useEffect`), or browser APIs. Default to Server Components.
- **Metadata in Client Components:** Cannot export `metadata` from client components. Use layout files instead.
- **TypeScript `noUncheckedIndexedAccess`:** Always check array/object access for undefined. Use `?.` or `??` operators.
- **DISC Colors:** Use `disc-{d|i|s|c}` classes, not hardcoded hex values. Maintains design consistency.
- **Import Paths:** Always use `@/*` alias, never relative paths like `../../lib/utils`.

---

## PM Orchestrator Workflow

**STEP 1: READ & UNDERSTAND**
1. Read @docs/sprints/sprint-2/SPRINT_PLAN.md thoroughly
2. Focus on Sprint 2B scope:
   - Feature 3: Results Visualization
   - Feature 4: AI Analysis Integration
3. Understand:
   - Each feature's complexity and domain hints
   - Suggested task breakdown
   - Delegation strategy notes
   - Dependencies between features
4. Internalize quality gates and acceptance criteria

**STEP 2: CREATE TASK FILES**

For each feature in Sprint 2B:

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

1. Update @docs/IMPLEMENTATION_PLAN.md checkboxes for Sprint 2B
2. Update @docs/PROJECT_STATUS.md with completion details
3. Fill in "Token Budget Tracking - Actuals" in SPRINT_PLAN.md
4. Add learnings to SPRINT_PLAN.md
5. Mark sprint complete
6. STOP - await Thomas signal for next sprint

---

## Task File Template

When creating task files in `/docs/sprints/sprint-2/tasks/`:

**Key principles:**
- Be specific (no placeholders, exact file paths)
- Be actionable (clear commands/actions)
- Reference patterns (point to existing code)
- Be testable (verifiable acceptance criteria)
- Be complete (agent shouldn't need to ask questions)

**Template structure:**
```markdown
# Task [NN]: [Task Name]

**Agent Type:** [frontend-engineer/backend-engineer/code-engineer/test-engineer]
**Model:** [haiku/sonnet/opus]
**Estimated Tokens:** [from sprint plan]

## Context
[Explain WHY this task exists, WHAT came before, and HOW it fits into the sprint]

## Objective
[Clear, specific statement of what this task accomplishes]

## Steps
1. [Specific action with exact file path]
2. [Reference existing pattern from /path/to/file.tsx]
3. [Implementation detail]
4. [Verification command]

## Acceptance Criteria
- [ ] Criterion 1 (specific and testable)
- [ ] Criterion 2 (specific and testable)

## Verification
\`\`\`bash
npm run lint
npm run build
\`\`\`

## Patterns to Follow
- Page structure: See /app/page.tsx for Server Component pattern
- Component pattern: See /components/landing/EntryCard.tsx
- Styling: Use cn() utility, DISC color classes
```

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

Sprint 2B implements 8 requirements:
- REQ-IND-070: AI RAG integration
- REQ-IND-080: AI personalized generation
- REQ-IND-090: Results visualization (charts)
- REQ-IND-100: Results page layout
- REQ-IND-110: JSON export
- REQ-IND-120: Print/save functionality
- REQ-IND-150: Error handling for API failures
- REQ-INFRA-060: Error boundaries

These are NON-NEGOTIABLE. Every implementation must satisfy these.

---

## Commands

Run these during quality verification:

- dev: `npm run dev` - Start development server (http://localhost:3000)
- build: `npm run build` - Production build
- lint: `npm run lint` - ESLint check (must pass with zero errors)
- test: `npm test` - Run Vitest unit tests
- start: `npm start` - Start production server

---

## Additional Project Policies

- `.claude/` directory is PROTECTED - never modify without explicit user request
- Project README created only AFTER project is functional, not during development
- Sprint task files in `/docs/sprints/sprint-2/tasks/` persist as execution history
- Tactical SPRINT_PLAN.md can be enhanced with notes during execution
- Token actuals should be recorded in SPRINT_PLAN.md after sprint completion

---

## Sprint 2B Ready for Execution

This CLAUDE.md provides the operating manual for PM Orchestrator.

**Sprint 2A Status:** COMPLETE (assessment UI, scoring engine, persistence)

**Sprint 2B Scope:** AI integration + results visualization

**Next step:** Read @docs/sprints/sprint-2/SPRINT_PLAN.md to begin Sprint 2B execution.

---
