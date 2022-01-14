import { format } from 'date-fns'
import { dateValidator } from './utils.js'
import * as yup from 'yup'

export default class DiaryClass {
  async getDiary(yearId, start, end, withLaAssigns = false) {
    await validateSchema([
      ['yearId', yearId, yup.number().required()],
      ['start', start, dateValidator],
      ['end', end, dateValidator],
      ['withLaAssigns', withLaAssigns, yup.bool()]
    ])

    const formatDate = dateObject => format(dateObject, 'yyyy-MM-dd')

    const query = {
      yearId,
      studentId: this.studentId,
      weekStart: formatDate(start),
      weekEnd: formatDate(end),
      withLaAssigns,
    }
    const diary = await this.fetch(`https://asurso.ru/webapi/student/diary?${new URLSearchParams(query)}`)
    return diary
  }
}
