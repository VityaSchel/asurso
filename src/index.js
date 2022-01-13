import { aggregation } from './utils.js'
import Login from './LoginClass.js'
import * as yup from 'yup'

class BaseClass {
  constructor(loginDetails) {
    const schema = yup.object().shape({
      countryID: yup.number().required(),
      regionID: yup.number().required(),
      regionAreaID: yup.number().required(),
      cityID: yup.number().required(),
      schoolTypeID: yup.number().required(),
      schoolID: yup.number().required(),
      login: yup.string().required(),
      password: yup.string().required(),
    })

    schema.validate(loginDetails)
    this.loginDetails = loginDetails
  }
}

export default class ASURSO extends aggregation(
  BaseClass,
  Login
) {}
