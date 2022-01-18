import { format } from 'date-fns'
import { dateValidator, validateSchema } from './utils.js'
import * as yup from 'yup'

export default class DocumentGenerationClass {
  async generateStudentTotalReport(start, end, yearId = this.yearID) {
    await validateSchema([
      ['yearId', yearId, yup.number().required()],
      ['start', start, dateValidator],
      ['end', end, dateValidator]
    ])
  }

}
