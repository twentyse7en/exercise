import { useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet from './components/BottomSheet'
import HeatmapGrid from './components/HeatmapGrid'
import { EXERCISES, type ExerciseId } from './model/exercises'
import { loadCompletions, saveCompletions, type CompletionState } from './model/storage'
import { formatISODate } from './model/time'
import { useElementWidth } from './model/useElementWidth'

function toggleDoneForDate(
  state: CompletionState,
  exerciseId: ExerciseId,
  isoDate: string
): CompletionState {
  const current = state[exerciseId] ?? {}
  const nextForExercise = { ...current, [isoDate]: !current[isoDate] }
  return { ...state, [exerciseId]: nextForExercise }
}

export default function App() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<ExerciseId | null>(null)
  const [completions, setCompletions] = useState<CompletionState>(() => loadCompletions())

  useEffect(() => {
    saveCompletions(completions)
  }, [completions])

  const today = formatISODate(new Date())

  return (
    <main className="screen">
      <header className="topbar">
        <div>
          <div className="badge">LOCAL ONLY</div>
          <h1 className="title">Exercise</h1>
          <p className="subtitle">Tap a card to see the routine. Use ✓ to mark today.</p>
        </div>
      </header>

      <section className="list">
        {EXERCISES.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exerciseId={exercise.id}
            title={exercise.title}
            subtitle={exercise.subtitle}
            emoji={exercise.emoji}
            tint={exercise.tint}
            todayDone={!!completions[exercise.id]?.[today]}
            completions={completions[exercise.id] ?? {}}
            onToggleToday={() => setCompletions((s) => toggleDoneForDate(s, exercise.id, today))}
            onOpen={() => setSelectedExerciseId(exercise.id)}
          />
        ))}
      </section>

      <BottomSheet
        open={selectedExerciseId !== null}
        title={selectedExerciseId ? EXERCISES.find((e) => e.id === selectedExerciseId)!.title : ''}
        onClose={() => setSelectedExerciseId(null)}
      >
        {selectedExerciseId ? (
          <ExerciseDetails exerciseId={selectedExerciseId} />
        ) : (
          <div style={{ height: 1 }} />
        )}
      </BottomSheet>
    </main>
  )
}

function ExerciseDetails({ exerciseId }: { exerciseId: ExerciseId }) {
  const exercise = EXERCISES.find((e) => e.id === exerciseId)!
  return (
    <div className="sheetContent">
      <div className="sheetIntro">
        <div className="sheetIcon" style={{ ['--tint' as string]: exercise.tint }}>
          <span className="sheetEmoji">{exercise.emoji}</span>
        </div>
        <div>
          <div className="sheetTitle">{exercise.title}</div>
          <div className="sheetSubtitle">{exercise.subtitle}</div>
        </div>
      </div>

      <div className="sectionTitle">Exercises</div>
      <ul className="exerciseList">
        {exercise.items.map((item) => (
          <li key={item} className="exerciseItem">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExerciseCard(props: {
  exerciseId: ExerciseId
  title: string
  subtitle: string
  emoji: string
  tint: string
  todayDone: boolean
  completions: Record<string, boolean>
  onToggleToday: () => void
  onOpen: () => void
}) {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const gridWidth = useElementWidth(gridRef)

  const cell = 14
  const gap = 5
  const weeks = useMemo(() => {
    if (!gridWidth) return 16
    const columns = Math.floor((gridWidth + gap) / (cell + gap))
    return Math.max(10, Math.min(22, columns))
  }, [gridWidth])

  return (
    <div className="exerciseCard" onClick={props.onOpen}>
      <div className="cardHeader">
        <div className="cardLeft">
          <div className="iconTile" style={{ ['--tint' as string]: props.tint }}>
            <span className="emoji">{props.emoji}</span>
          </div>
          <div className="cardText">
            <div className="cardTitle">{props.title}</div>
            <div className="cardSubtitle">{props.subtitle}</div>
          </div>
        </div>

        <button
          className={props.todayDone ? 'checkButton on' : 'checkButton'}
          style={{ ['--tint' as string]: props.tint }}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            props.onToggleToday()
          }}
        >
          <CheckIcon />
        </button>
      </div>

      <div ref={gridRef} className="gridWrap">
        <HeatmapGrid
          accent={props.tint}
          cell={cell}
          gap={gap}
          weeks={weeks}
          completions={props.completions}
        />
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="checkIcon" viewBox="0 0 24 24">
      <path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
