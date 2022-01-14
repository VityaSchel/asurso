import { aggregation } from './utils.js'
import Login from './LoginClass.js'
import Diary from './DiaryClass.js'
import Users from './UsersClass.js'
import Messages from './MessagesClass.js'
import * as yup from 'yup'
import nodefetch from 'node-fetch'
import _ from 'lodash'
import cookie from 'cookie'

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

    schema.validateSync(loginDetails)
    this.loginDetails = loginDetails
  }

  async fetch(url, options = {}) { // private, do not place # before method name
    _.set(options, 'headers.at', this.atKey)
    const cookies = options.cookie ?? []
    _.set(options, 'headers.Cookie', [cookie.serialize('ESRNSec', this.sessionToken), ...cookies].join('; '))
    const response = await nodefetch(url, options)
    return await response.json()
  }
}

export default class ASURSO extends aggregation(
  BaseClass,
  Login,
  Diary,
  Users,
  Messages
) {}
