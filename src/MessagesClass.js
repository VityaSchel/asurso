import { validateSchema } from './utils.js'
import * as yup from 'yup'
import htmlParser from 'node-html-parser'
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

  async sendMessage(subject = '', text, attachmentID, recipientID, copyRecipientID = null, blindCopyRecipientID = null, notifyAboutReading = false) {
    await validateSchema([
      ['subject', subject, yup.string()],
      ['text', text, yup.string().required()],
      ['attachmentID', attachmentID, yup.number().nullable()],
      ['recipientID', recipientID, yup.number().required()],
      ['copyRecipientID', copyRecipientID, yup.number().nullable()],
      ['blindCopyRecipientID', blindCopyRecipientID, yup.number().nullable()],
      ['notifyAboutReading', notifyAboutReading, yup.boolean()],
    ])

    const sendMessageFormPage = await this.fetch(`https://asurso.ru/asp/Messages/composemessage.asp?at=${this.atKey}`, {}, false)
    const responseCookies = cookie.parse(sendMessageFormPage.headers.get('set-cookie'))
    const sendMessageFormHTML = await sendMessageFormPage.text()
    const root = htmlParser.parse(sendMessageFormHTML)
    const xsrfToken = root.querySelector('form > [name=AntiForgeryToken]').getAttribute('value')
    const body = {
      LoginType: 0,
      AT: this.atKey,
      AntiForgeryToken: xsrfToken,
      MID: '',
      MBID: 3,
      LTO: recipientID,
      LCC: copyRecipientID ?? '',
      LBC: blindCopyRecipientID ?? '',
      TA: '',
      NA: '',
      PP: '',
      DMID: '',
      RT: '',
      DESTINATION: '',
      ShortAttach: 1,
      EDITUSERID: this.studentID,
      ...(notifyAboutReading && { NEEDNOTIFY: notifyAboutReading }),
      SU: subject,
      BO: text,
      STMSGREPORT: '',
      ...(attachmentID && { attachment: attachmentID })
    }
    return await this.fetch(`https://asurso.ru/asp/Messages/sendsavemsg.asp?at=${this.atKey}`, {
      method: 'POST',
      body: new URLSearchParams(body),
      cookies: [cookie.serialize(xsrfToken.replaceAll('-', '%2D'), responseCookies[xsrfToken.replaceAll('-', '%2D')])]
    }, false)
  }
}
