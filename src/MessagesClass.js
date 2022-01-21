import { validateSchema } from './utils.js'
import * as yup from 'yup'
import cookie from 'cookie'

export default class MessagesClass {
  async getMessages(folderID = 1, startIndex = 0, pageSize = 100, sort = 'Sent DESC') {
    await validateSchema([
      ['folderID', folderID, yup.number().required()],
      ['startIndex', startIndex, yup.number().required()],
      ['pageSize', pageSize, yup.number().required()],
      ['sort', sort, yup.string().required()],
    ])

    const query = new URLSearchParams({
      AT: this.atKey,
      nBoxID: folderID,
      jtStartIndex: startIndex,
      jtPageSize: pageSize
    }).toString() + `&jtSorting=${sort.replaceAll(/ /g, '%20')}`

    const messagesResult = await this.fetch(`https://asurso.ru/asp/ajax/GetMessagesAjax.asp?${query}`)
    return messagesResult
  }

  async sendMessage() {
    v.querySelector('form > [name=AntiForgeryToken]').getAttribute('value')
  }
}
