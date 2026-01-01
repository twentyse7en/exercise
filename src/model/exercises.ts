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
    id: 'warmup',
    title: 'Warm up',
    subtitle: 'Mobility',
    emoji: '🧘',
    tint: '#ffb6e1',
    items: [
      'Neck rotations — 10x',
      'Arm circles — 10x',
      'Hip circles — 10x',
      'Jumping Jacks — 10x',
      'Brisk marching — 1 Min'
    ],
  },
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
      'Lunges — 10x',
    ],
  },
]
