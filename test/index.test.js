import 'dotenv/config'
import ASURSO from '../lib/index.js'
import testConfig from './test.config.js'

const api = new ASURSO({
  ...testConfig,
  password: process.env.PASSWORD
})

describe('вход в аккаунт', () => {
  test('создание сессии', async () => {
    const loginResult = await api.login()
    console.log(loginResult)
    expect(loginResult).toHaveProperty('atKey')
    expect(loginResult).toHaveProperty('sessionToken')
  })
  test('получение studentID', async () => {
    expect(api).toHaveProperty('studentID')
    expect(api.studentID).toEqual(expect.any(Number))
    const studentID = await api.getStudentID()
    expect(studentID).toEqual(expect.any(Number))
  })
  test('получение yearID', async () => {
    expect(api).toHaveProperty('yearID')
    expect(api.yearID).toEqual(expect.any(Number))
    const yearID = await api.getYearID()
    expect(yearID).toEqual(expect.any(Number))
  })
})

describe('работа с дневником', () => {
  test('получение дней', async () => {
    const diary = await api.getDiary(new Date(), new Date())
    expect(diary).toHaveProperty('className')
    expect(diary).toHaveProperty('laAssigns')
    expect(diary).toHaveProperty('termName')
    expect(diary).toHaveProperty('weekDays')
    expect(diary.weekDays).toEqual(expect.any(Array))
  })
})

// console.log((await api.getUsersOnline()).slice(0,5))
// console.log(await api.getUserProfile())
// console.log(await api.getAssignmentDetails(228840479))
// console.log(await api.getAnnouncements(2))
// const portfolio = await api.getPortfolio()

// console.log(portfolio)
// console.log(portfolio.groups.find(({ name }) => name === 'Самара').docs)

// const buffer = Buffer.from(await (await api.generateStudentTotalReport(new Date(2022, 1, 10), new Date(2022, 5, 28))).arrayBuffer())
// await fs.writeFile('/tmp/temppdf.pdf', buffer)
// spawn('open', ['-g', '-a', 'Preview', '/tmp/temppdf.pdf'])
// console.log(await (await api.generateStudentTotalReport(new Date(2022, 1, 10), new Date(2022, 5, 28), true)).text())

// console.log(await api.getMessages())

// describe('')

//console.log(await api.getThreads())
// console.log(await api.getMessagesFromThread(147692))
