export function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function weekdayIndexMondayFirst(date: Date) {
  return (date.getDay() + 6) % 7
}

export function startOfWeek(date: Date) {
  return addDays(date, -weekdayIndexMondayFirst(date))
}

export function endOfWeek(date: Date) {
  return addDays(date, 6 - weekdayIndexMondayFirst(date))
}

export function formatISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
