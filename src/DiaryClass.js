import { format } from 'date-fns'
import * as yup from 'yup'

export default class DiaryClass {
  async getDiary(yearId, start, end, withLaAssigns = false) {
    try { await yup.number().required().validate(yearId) } catch(e) { e.path = 'yearId'; throw e }
    try { await yup.date().test('is Date', 'StartDate is not date', d => d instanceof Date).required().validate(start) } catch(e) { e.path = 'start'; throw e }
    try { await yup.date().test('is Date', 'EndDate is not date', d => d instanceof Date).required().validate(end) } catch(e) { e.path = 'end'; throw e }
    try { await yup.bool().validate(withLaAssigns) } catch(e) { e.path = 'withLaAssigns'; throw e }

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
