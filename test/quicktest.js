import 'dotenv/config'
import ASURSO from '../src/index.js'
import testConfig from './test.config.js'

const api = new ASURSO({
  ...testConfig,
  password: process.env.PASSWORD
})

console.log(await api.login({ atKey: process.env.AT, sessionToken: process.env.SESSION_TOKEN }))
console.log(await api.getThreads())
