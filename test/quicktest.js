import 'dotenv/config'
import ASURSO from '../src/index.js'
import testConfig from './test.config.js'

const api = new ASURSO({
  ...testConfig,
  password: process.env.PASSWORD
})

console.log(await api.login({ atKey: process.env.AT, sessionToken: process.env.SESSION_TOKEN }))
// console.log(await api.getAssignmentAttachments(228719822,228952651,229299822,229010324,229632716,228919704,229610499,228792156,229011190,229300527,229300730,229460181,229592858,229523467,229634210,229300865,229595792,229633014,229701971,229836233))
console.log(await (await api.sendMessage('Отправка письма из NodeJS!', 'Это попытка отправить письмо прямо из кода', null, 592640)).text())
