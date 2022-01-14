import { validateSchema } from './utils.js'
import * as yup from 'yup'

export default class UsersClass {
  async getUserProfile(studentID) {
    await validateSchema([
      ['studentID', studentID, yup.number()]
    ])
    if(!studentID) studentID = this.studentID

    const profile = await this.fetch(`https://asurso.ru/webapi/educcertificates/student/${studentID}`)
    return profile
  }

  async getUsersOnline() {
    const usersOnline = await this.fetch('https://asurso.ru/webapi/context/activeSessions')
    return usersOnline
  }
}
