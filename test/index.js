import 'dotenv/config'
import ASURSO from '../lib/index.js'
import fs from 'fs/promises'
import { spawn } from 'child_process'

const api = new ASURSO({
  countryID: 2,
  regionID: 1,
  regionAreaID: -1,
  cityID: 1,
  schoolTypeID: 2,
  schoolID: 257,
  login: 'ЩелочковВ',
  password: process.env.PASSWORD
})

let existingSession = { atKey: process.env.AT, sessionToken: process.env.SESSION_TOKEN }

console.log(await api.login(existingSession))
// console.log(await api.getDiary(new Date(), new Date()))
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

console.log(await api.getMessages())
