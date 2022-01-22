import { parse } from 'date-fns'
import { ru as dateFnsRuLocale } from 'date-fns/locale/index.js'
import htmlParser from 'node-html-parser'

export default class MessagesClass {
  async getThreads() {
    const query = new URLSearchParams({
      at: this.atKey
    })
    const forumPage = await this.fetch(`https://asurso.ru/asp/Forum/Forum.asp?${query}`, {}, false)
    const forumHTML = await forumPage.text()
    const root = htmlParser.parse(forumHTML.replaceAll(/<\/tr>/g, '</tr><tr>').replace('<tr></table>', '</table>'))
    const tableRows = Array.from(root.querySelectorAll('table tr')).slice(1)
    const threads = tableRows.map(thread => {
      const lastMessage = thread.childNodes[4]
      const threadLink = thread.querySelector('a').getAttribute('href')
      return {
        id: threadLink.match(/^Javascript:showthread\((\d+)\)$/)[1],
        author: thread.childNodes[1].innerText,
        moderators: thread.childNodes[2].innerText,
        answersCount: thread.childNodes[3].innerText,
        lastMessage: {
          date: parse(lastMessage.childNodes[0].innerText, 'EEEEEE, d LLL y H:mm', new Date(), { locale: dateFnsRuLocale }),
          author: lastMessage.childNodes[2].innerText
        }
      }
    })
    return threads
  }

  async getMessagesFromThread() {

  }

  async createThread() {

  }

  async sendMessageToThread() {

  }
}
