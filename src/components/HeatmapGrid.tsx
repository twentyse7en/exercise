import { useMemo } from 'react'
import { addDays, endOfWeek, formatISODate, startOfWeek } from '../model/time'

export default function HeatmapGrid(props: {
  completions: Record<string, boolean>
  weeks: number
  cell: number
  gap: number
  accent: string
}) {
  const { start, end } = useMemo(() => {
    const today = new Date()
    const gridEnd = endOfWeek(today)
    const gridStart = startOfWeek(addDays(gridEnd, -(props.weeks * 7 - 1)))
    return { start: gridStart, end: gridEnd }
  }, [props.weeks])

  const cells = useMemo(() => {
    const count = props.weeks * 7
    const out: { date: Date; iso: string; done: boolean; isToday: boolean }[] = []
    const todayIso = formatISODate(new Date())
    for (let i = 0; i < count; i++) {
      const date = addDays(start, i)
      const iso = formatISODate(date)
      out.push({
        date,
        iso,
        done: !!props.completions[iso],
        isToday: iso === todayIso,
      })
    }
    return out
  }, [props.completions, props.weeks, start])

  return (
    <div
      className="heatmap"
      style={
        {
          ['--cell' as string]: `${props.cell}px`,
          ['--gap' as string]: `${props.gap}px`,
          ['--weeks' as string]: props.weeks,
          ['--accent' as string]: props.accent,
        } as React.CSSProperties
      }
    >
      {cells.map((cell, index) => {
        const row = (index % 7) + 1
        const col = Math.floor(index / 7) + 1
        const className = cell.done
          ? cell.isToday
            ? 'hmCell on today'
            : 'hmCell on'
          : cell.isToday
            ? 'hmCell today'
            : 'hmCell'

        return (
          <div
            key={cell.iso}
            className={className}
            style={{ gridRow: row, gridColumn: col }}
          />
        )
      })}
    </div>
  )
}
