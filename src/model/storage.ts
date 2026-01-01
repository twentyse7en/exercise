import { EXERCISES, type ExerciseId } from './exercises'

export type CompletionState = Record<ExerciseId, Record<string, boolean>>

const STORAGE_KEY = 'exercise-tracker:v1'

function emptyState(): CompletionState {
  return Object.fromEntries(EXERCISES.map((e) => [e.id, {}])) as CompletionState
}

export function loadCompletions(): CompletionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return emptyState()

    const out = emptyState()
    for (const exercise of EXERCISES) {
      const maybeMap = (parsed as any)[exercise.id]
      if (!maybeMap || typeof maybeMap !== 'object') continue
      for (const [iso, value] of Object.entries(maybeMap as Record<string, unknown>)) {
        if (typeof value === 'boolean') out[exercise.id][iso] = value
      }
    }
    return out
  } catch {
    return emptyState()
  }
}

export function saveCompletions(state: CompletionState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}
