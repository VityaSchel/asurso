import { format } from 'date-fns'
import { dateValidator, validateSchema } from './utils.js'
import * as yup from 'yup'

export default class DocumentGenerationClass {
  async generateStudentTotalReport(start, end, yearId = this.yearID, withLaAssigns = false) {
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
}
