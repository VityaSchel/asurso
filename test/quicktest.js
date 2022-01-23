import 'dotenv/config'
import ASURSO from '../lib/index.js'
import testConfig from './test.config.js'

const api = new ASURSO({
  ...testConfig,
  password: process.env.PASSWORD
})

console.log(await api.login({ atKey: process.env.AT, sessionToken: process.env.SESSION_TOKEN }))
const report = await api.generateStudentTotalReport(new Date(2022, 1, 10), new Date(2022, 5, 28), true)
console.log(report.parse())
