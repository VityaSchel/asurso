import 'dotenv/config'
import ASURSO from '../src/index.js'

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

const existingSession = { atKey: process.env.AT, sessionToken: process.env.SESSION_TOKEN }

await api.login(existingSession)
console.log(await api.getDiary(209935, new Date(), new Date()))
