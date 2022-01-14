import { validateSchema } from './utils.js'
import * as yup from 'yup'

export default class UsersClass {
  async getUserProfile(studentID) {
    await validateSchema({ studentID: yup.number() }, { studentID }, ['studentID'])
    if(!studentID) studentID = this.studentID

    const diary = await this.fetch(`https://asurso.ru/webapi/educcertificates/student/${studentID}`)
    return diary
  }

  async getUsersOnline() {
    try { await yup.number().validate(studentID) } catch(e) { e.path = 'studentID'; throw e }
    if(!studentID) studentID = this.studentID

    const query = {
      yearId,
      studentId: this.studentId,
      weekStart: formatDate(start),
      weekEnd: formatDate(end),
      withLaAssigns,
    }
    const diary = await this.fetch(`https://asurso.ru/webapi/educcertificates/student/${studentID}`)
    return diary
  }
}


https://asurso.ru/webapi/context/activeSessions
