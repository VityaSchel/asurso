import { format } from 'date-fns'
import { dateValidator, validateSchema } from './utils.js'
import * as yup from 'yup'

export default class DiaryClass {
  async getDiary(start, end, yearId = this.yearID, withLaAssigns = false) {
    await validateSchema([
      ['yearId', yearId, yup.number().required()],
      ['start', start, dateValidator],
      ['end', end, dateValidator],
      ['withLaAssigns', withLaAssigns, yup.bool()]
    ])

    const formatDate = dateObject => format(dateObject, 'yyyy-MM-dd')

    const query = {
      yearId,
      studentId: this.studentID,
      weekStart: formatDate(start),
      weekEnd: formatDate(end),
      withLaAssigns,
    }
    const diary = await this.fetch(`https://asurso.ru/webapi/student/diary?${new URLSearchParams(query)}`)
    return diary
  }

  async getAssignmentDetails(assignmentID) {
    await validateSchema([
      ['assignmentID', assignmentID, yup.number().required()]
    ])

    const query = {
      studentId: this.studentID
    }
    const diary = await this.fetch(`https://asurso.ru/webapi/student/diary/assigns/${assignmentID}?${new URLSearchParams(query)}`)
    return diary
  }

  async getAssignmentAttachments(...assignIDs) {
    await validateSchema([
      ['assignIDs', assignIDs, yup.array().of(yup.number()).required()]
    ])

    return await this.fetch(`https://asurso.ru/webapi/student/diary/get-attachments?studentId=${this.studentID}`, {
      method: 'POST',
      body: JSON.stringify({
        assignId: assignIDs
      }),
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
  }
}
