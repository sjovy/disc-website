# Task 05: Implement localStorage Persistence

**Agent Type:** code-engineer
**Model:** haiku
**Estimated Tokens:** ~20k

---

## Context

**Sprint 2A Goal:** Core Assessment Flow (Features 1, 2, 5)

**Why this task exists:**
Users need to save in-progress assessments and completed results to localStorage so they don't lose their work if they close the browser. This is a simple CRUD operation but critical for user experience.

**What came before:**
- Task 02 created assessment UI with answer state structure
- Answer state uses Map<number, {most: string, least: string}> format
- Assessment page at `/test` manages state with React useState

**How it fits:**
This task adds persistence layer to the assessment UI. When users select answers, they automatically save to localStorage. On page reload, answers restore from localStorage.

**Dependencies:**
- Task 02 complete (assessment UI exists with answer state)

---

## Objective

Build localStorage persistence utilities in `/lib/storage/` for saving and restoring in-progress assessment answers and completed results, integrate with assessment page, handle quota exceeded errors gracefully.

---

## Steps

1. **Create TypeScript type definitions**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/storage/types.ts`
   - Define types:
     - `StoredAnswer = { most: string | null, least: string | null }`
     - `StoredAssessment = { answers: Record<number, StoredAnswer>, timestamp: number }`
     - `StoredResult = { scores: DimensionScores, pattern: DISCPattern, timestamp: number }`
   - Note: Convert Map to Record for JSON serialization

2. **Implement localStorage utilities**
   - Create `/Users/thomas/ClaudeCode/coding/disc-website/lib/storage/persistence.ts`
   - Implement storage key constants:
     - `STORAGE_KEY_PROGRESS = 'disc-assessment-progress'`
     - `STORAGE_KEY_RESULTS = 'disc-assessment-results'`
   - Implement functions:
     - `saveProgress(answers: Map<number, {most: string | null, least: string | null}>): boolean`
       - Convert Map to Record
       - Add timestamp
       - Try to save to localStorage
       - Return true on success, false on quota exceeded
     - `loadProgress(): Map<number, {most: string | null, least: string | null}> | null`
       - Load from localStorage
       - Parse JSON
       - Convert Record back to Map
       - Return null if not found or invalid
     - `clearProgress(): void`
       - Remove progress key from localStorage
     - `saveResults(scores: DimensionScores, pattern: DISCPattern): boolean`
       - Save completed results with timestamp
       - Return true on success, false on quota exceeded
     - `loadResults(): StoredResult | null`
       - Load saved results
       - Return null if not found
     - `clearResults(): void`
       - Remove results key from localStorage

3. **Add error handling**
   - Wrap localStorage operations in try-catch
   - Handle quota exceeded error (DOMException code 22)
   - Handle JSON parse errors (corrupted data)
   - Return null/false on errors (graceful degradation)
   - Console.warn for debugging (not console.error - not critical)

4. **Integrate with assessment page**
   - Modify `/Users/thomas/ClaudeCode/coding/disc-website/app/test/page.tsx`
   - On component mount (useEffect with empty deps):
     - Call `loadProgress()` to restore saved answers
     - If answers found, set initial state with restored data
   - On answer change (useEffect with answers dependency):
     - Debounce save operation (wait 500ms after last change)
     - Call `saveProgress(answers)` to persist current state
   - On assessment submit (after scoring):
     - Call `clearProgress()` to remove in-progress data
     - Call `saveResults(scores, pattern)` to save completed result
   - Add "Clear Progress" button to UI (optional, helpful for testing)
     - Call `clearProgress()` and reset state

5. **Handle quota exceeded**
   - If `saveProgress` returns false:
     - Display warning toast/banner: "Unable to save progress (storage full)"
     - Continue allowing user to complete assessment (don't block)
   - If `saveResults` returns false:
     - Display warning: "Unable to save results, please download JSON"
     - Offer JSON export as fallback

6. **Add debouncing for autosave**
   - Use setTimeout to debounce save operations
   - Clear previous timeout on each change
   - Wait 500ms after last change before saving
   - Prevent excessive localStorage writes

7. **Test persistence manually**
   - Start dev server: `npm run dev`
   - Navigate to http://localhost:3000/test
   - Answer a few questions
   - Refresh page - verify answers restored
   - Complete assessment, verify results saved
   - Open DevTools → Application → localStorage
   - Verify keys present: 'disc-assessment-progress', 'disc-assessment-results'
   - Clear localStorage, verify assessment resets

---

## Acceptance Criteria

- [ ] localStorage utilities created in `/lib/storage/persistence.ts`
- [ ] `saveProgress` persists in-progress answers to localStorage
- [ ] `loadProgress` restores answers on page reload
- [ ] `clearProgress` removes in-progress data
- [ ] `saveResults` persists completed results to localStorage
- [ ] `loadResults` retrieves saved results
- [ ] Quota exceeded errors handled gracefully (no crashes)
- [ ] JSON parse errors handled (corrupted data doesn't crash)
- [ ] Debounced autosave (500ms after last change)
- [ ] Assessment page integrates persistence on mount and change
- [ ] TypeScript strict types for storage data structures
- [ ] Manual testing confirms persistence works across page reloads

---

## Verification

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build check
npm run build

# Manual testing
npm run dev
# Navigate to http://localhost:3000/test
# Answer questions, refresh, verify restore
# Complete assessment, verify results saved
# Check DevTools → Application → localStorage
```

---

## Patterns to Follow

**localStorage Save Pattern:**
```typescript
export function saveProgress(answers: Map<number, {most: string | null, least: string | null}>): boolean {
  try {
    const answersObj: Record<number, {most: string | null, least: string | null}> = {}
    answers.forEach((value, key) => {
      answersObj[key] = value
    })

    const data: StoredAssessment = {
      answers: answersObj,
      timestamp: Date.now()
    }

    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(data))
    return true
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      console.warn('localStorage quota exceeded')
    } else {
      console.warn('Failed to save progress', error)
    }
    return false
  }
}
```

**localStorage Load Pattern:**
```typescript
export function loadProgress(): Map<number, {most: string | null, least: string | null}> | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROGRESS)
    if (!data) return null

    const parsed: StoredAssessment = JSON.parse(data)
    const answers = new Map<number, {most: string | null, least: string | null}>()

    Object.entries(parsed.answers).forEach(([key, value]) => {
      answers.set(Number(key), value)
    })

    return answers
  } catch (error) {
    console.warn('Failed to load progress', error)
    return null
  }
}
```

**React Integration Pattern:**
```typescript
'use client'

import { useEffect, useState, useRef } from 'react'
import { saveProgress, loadProgress, clearProgress } from '@/lib/storage/persistence'

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Map<number, {most: string | null, least: string | null}>>(new Map())
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load progress on mount
  useEffect(() => {
    const saved = loadProgress()
    if (saved) {
      setAnswers(saved)
    }
  }, [])

  // Debounced autosave on answers change
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (answers.size > 0) {
        saveProgress(answers)
      }
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [answers])

  // ... rest of component
}
```

---

## Notes

**Critical Requirements:**
- REQ-IND-130: localStorage persistence (in-progress)
- REQ-IND-140: localStorage persistence (completed results)

**localStorage Keys:**
- `disc-assessment-progress`: In-progress assessment answers
- `disc-assessment-results`: Completed assessment results with scores/pattern

**Data Structures:**
- Answers: Map<number, {most: string | null, least: string | null}>
- localStorage: Must convert Map to Record for JSON serialization
- Timestamp: Include for debugging and data freshness

**Error Handling:**
- Quota exceeded (DOMException code 22): Warn user, continue without save
- JSON parse error: Return null, ignore corrupted data
- Missing data: Return null (not an error, just first visit)

**Debouncing:**
- Wait 500ms after last answer change before saving
- Prevents excessive localStorage writes (performance)
- Use useRef to store timeout ID, clear on unmount

**User Experience:**
- Autosave: No "Save" button needed, automatic on change
- Restore: Silent on page load, no notification needed
- Clear: Optional "Start Over" button to reset progress
- Quota warning: Only show if save fails (rare)

**Storage Size:**
- In-progress assessment: ~1KB (24 questions × small JSON)
- Completed results: ~2KB (scores + pattern + metadata)
- Total: < 5KB (well within localStorage 5-10MB limit)

**Testing Checklist:**
- [ ] Answer questions, refresh, verify answers persist
- [ ] Complete assessment, verify results saved
- [ ] Clear localStorage manually, verify fresh start
- [ ] Fill localStorage to quota (simulate full), verify graceful handling
- [ ] Corrupt JSON in localStorage, verify no crash

**No Backend Dependency:**
- All storage is client-side (localStorage)
- No API calls, no network requests
- Works offline after first page load

**Migration Note:**
- In production, consider moving to backend storage for multi-device sync
- Current v1 approach: client-side only (acceptable for portfolio)
