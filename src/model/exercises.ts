export type ExerciseId = 'running' | 'strength' | 'warmup'

export type Exercise = {
  id: ExerciseId
  title: string
  subtitle: string
  emoji: string
  tint: string
  items: string[]
}

export const EXERCISES: Exercise[] = [
  {
    id: 'running',
    title: 'Running',
    subtitle: 'Easy pace',
    emoji: '🏃',
    tint: '#8ae6ff',
    items: ['5 min walk', '15–25 min easy run', '2 min cool down walk'],
  },
  {
    id: 'strength',
    title: 'Strength',
    subtitle: 'Full body',
    emoji: '🏋️',
    tint: '#b3a0ff',
    items: [
      'Push-ups — 3 × 8',
      'Bodyweight squats — 3 × 12',
      'Plank — 3 × 30s',
      'Glute bridge — 3 × 12',
    ],
  },
  {
    id: 'warmup',
    title: 'Warm up',
    subtitle: 'Mobility',
    emoji: '🧘',
    tint: '#ffb6e1',
    items: [
      'Neck rotations — 30s',
      'Shoulder rolls — 30s',
      'Arm circles — 30s',
      'Hip circles — 30s',
      'Leg swings — 10/side',
    ],
  },
]
