import { validateSchema } from './utils.js'
import * as yup from 'yup'

export default class AnnouncementsClass {
  async getAnnouncements(take, fullVersion = false) {
    await validateSchema([
      ['take', take, yup.number().required()],
      ['fullVersion', fullVersion, yup.boolean()]
    ])

    const query = {
      take,
      fullVersion
    }

    const announcements = await this.fetch(`https://asurso.ru/webapi/announcements?${new URLSearchParams(query)}`)
    return announcements
  }

  async downloadAnnouncementAttachment(attachmentID) {
    return this.fetch(`https://asurso.ru/webapi/attachments/${attachmentID}`, {}, false)
  }
}
