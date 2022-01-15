export default class PortfolioClass {
  async getPortfolio(studentID) {
    const query = {
      userId: studentID ?? this.studentID
    }

    const portfolio = await this.fetch(`https://asurso.ru/webapi/portfolios/personal/?${new URLSearchParams(query)}`)
    return portfolio
  }

  // async downloadAnnouncementAttachment(attachmentID) {
  //   return this.fetch(`https://asurso.ru/webapi/attachments/${attachmentID}`, {}, false)
  // }
}
