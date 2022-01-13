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

console.log(await api.login())
