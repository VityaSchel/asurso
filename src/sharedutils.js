export { parseDate } from './utils.js'

export function calcAverageMark(marks) {
  const marksAligned = marks.reduce((prev, [mark, weight]) => prev.concat(...new Array(weight/10).fill(mark)), [])
  const average = marksAligned.reduce((prev, cur) => prev+cur, 0) / marksAligned.length
  const rounded = Math.round((average + Number.EPSILON) * 100) / 100
  return Number.isNaN(rounded) ? 0 : rounded
}
