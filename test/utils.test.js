import { utils } from '../src/index.js'

describe('средняя оценка', () => {
  test('2/10 4/10', () => {
    expect(utils.calcAverageMark([[2, 10], [4, 10]])).toBe(3)
  })
  test('4/20 3/10', () => {
    expect(utils.calcAverageMark([[4, 20], [3, 10]])).toBe(3.67)
  })
  test('2/10 5/40', () => {
    expect(utils.calcAverageMark([[2, 10], [5, 40]])).toBe(4.4)
  })
  test('пустой массив', () => {
    expect(utils.calcAverageMark([])).toBe(0)
  })
  test('5/10', () => {
    expect(utils.calcAverageMark([[5, 10]])).toBe(5)
  })
  test('5/40', () => {
    expect(utils.calcAverageMark([[5, 40]])).toBe(5)
  })
  test('5/10 * 4', () => {
    expect(utils.calcAverageMark([[5, 10], [5, 10], [5, 10], [5, 10]])).toBe(5)
  })
})

describe('парсинг дат', () => {
  test('Вс, 23 Янв. 2022 00:28', () => {
    expect(utils.parseDate('Вс, 23 Янв. 2022 00:28').getTime()).toBe(1642883280000)
  })
  test('Пт, 14 Янв. 2022 10:56', () => {
    expect(utils.parseDate('Вс, 23 Янв. 2022 00:28').getTime()).toBe(1642883280000)
  })
  test('Сб, 15 Янв. 2022 14:05', () => {
    expect(utils.parseDate('Сб, 15 Янв. 2022 14:05').getTime()).toBe(1642241100000)
  })
  test('Чт, 27 Июн. 2019 15:00', () => {
    expect(utils.parseDate('Чт, 27 Июн. 2019 15:00').getTime()).toBe(1561633200000)
  })
})
