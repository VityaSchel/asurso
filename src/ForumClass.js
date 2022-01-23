import { parseDate } from './utils.js'
import htmlParser from 'node-html-parser'

export default class MessagesClass {
  async getThreads(page = 1, pageSize = 25) {
    const query = new URLSearchParams({
      at: this.atKey,
      PAGE: page,
      PAGESIZE: pageSize
    })
    const forumPage = await this.fetch(`https://asurso.ru/asp/Forum/Forum.asp?${query}`, {}, false)
    const forumHTML = await forumPage.text()
    const root = htmlParser.parse(forumHTML.replaceAll(/<\/tr>/g, '</tr><tr>').replace('<tr></table>', '</table>'))
    const tableRows = Array.from(root.querySelectorAll('table tr')).slice(1)
    const threads = tableRows.map(thread => {
      const lastMessage = thread.childNodes[4]
      const threadLink = thread.querySelector('a')
      return {
        id: Number(threadLink.getAttribute('href').match(/^Javascript:showthread\((\d+)\)$/)[1]),
        name: threadLink.innerText,
        author: thread.childNodes[1].innerText,
        moderators: thread.childNodes[2].innerText,
        answersCount: Number(thread.childNodes[3].innerText),
        lastMessage: {
          date: parseDate(lastMessage.childNodes[0].innerText),
          author: lastMessage.childNodes[2].innerText
        }
      }
    })
    return threads
  }

  async getMessagesFromThread(threadID, page = 1, pageSize = 25) {
    const query = new URLSearchParams({
      at: this.atKey,
      TID: threadID,
      PAGE: page,
      PAGESIZE: pageSize,
    })
    const forumThreadPage = await this.fetch(`https://asurso.ru/asp/Forum/ShowThread.asp?${query}`, {}, false)
    const forumThreadHTML = await forumThreadPage.text()
    const root = htmlParser.parse(forumThreadHTML)
    const tableRows = Array.from(root.querySelectorAll('table tr')).slice(1)
    const messages = tableRows.map(message => {
      return {
        author: {
          name: message.childNodes[1].childNodes[0].innerText,
          position: message.childNodes[1].childNodes[2].innerText,
          avatar: message.childNodes[0].childNodes[0].getAttribute('src'),
        },
        message: message.childNodes[2].childNodes[3].innerHTML,
        date: parseDate(message.childNodes[2].childNodes[0].innerText.split('Добавлено: ', 2)[1])
      }
    })
    return messages
  }

  async createThread() {

  }

  async sendMessageToThread() {

  }
}
