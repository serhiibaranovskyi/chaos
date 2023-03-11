import format from 'date-fns/format'

export function displayDateTime(date: string | number) {
  return format(new Date(date), 'MMMM d, Y hh:mm')
}
