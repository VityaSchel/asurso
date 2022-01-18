import { dateValidator, validateSchema } from './utils.js'
import * as yup from 'yup'
import WebSocket from 'ws'
import cookie from 'cookie'

export default class DocumentGenerationClass {
  async generateStudentTotalReport(start, end, htmlVersion = false) {
    await validateSchema([
      ['start', start, dateValidator],
      ['end', end, dateValidator],
      ['htmlVersion', htmlVersion, yup.boolean()]
    ])

    const pdfVersionID = 13600184
    const htmlVersionID = 13635239
    const { fileID, closeWs } = await this.#generateDocument(htmlVersion ? htmlVersionID : pdfVersionID)

    const query = htmlVersion ? '' : `?${new URLSearchParams({ output: 'Pdf' })}`
    await this.fetch(`https://asurso.ru/webapi/reports/studenttotal/queue${query}`, {
      method: 'POST',
      body: JSON.stringify({
        selectedData: [
          {
            filterId: 'SID',
            filterValue: this.studentID
          },
          {
            filterId: 'period',
            filterValue: `${start.toISOString()} - ${end.toISOString()}`
          }
        ]
      })
    })

    await closeWs()
    return await this.fetch(`https://asurso.ru/webapi/files/${fileID}`, {}, false)
  }

  #generateDocument(generationTaskID) {
    return new Promise(async resolve => {
      const query = new URLSearchParams({
        clientProtocol: 1.5,
        at: this.atKey,
        connectionData: JSON.stringify([{ name : 'queuehub' }])
      })
      const negotiation = await this.fetch(`https://asurso.ru/WebApi/signalr/negotiate?${query}`)
      query.append('transport', 'webSockets')
      query.append('connectionToken', negotiation.ConnectionToken)

      const ws = new WebSocket(
        `wss://asurso.ru/WebApi/signalr/connect?${query}`,
        [],
        {
          headers: {
            Cookie: cookie.serialize('ESRNSec', this.sessionToken, { encode: text => text })
          }
        }
      )

      ws.on('error', e => { throw e })
      await new Promise(resolve => ws.on('open', resolve))

      await this.fetch(`https://asurso.ru/WebApi/signalr/start?${query}`)

      ws.send(JSON.stringify({ 'H': 'queuehub', 'M': 'StartTask', 'A': [generationTaskID], 'I': 0 }))

      ws.on('message', data => {
        const message = JSON.parse(data)
        const file = message.M?.find(hub => hub.H === 'QueueHub' && hub.A.some(task => task.TaskId === generationTaskID && task.Data))
        if(file) {
          const fileID = file.A.find(task => task.TaskId === generationTaskID).Data
          resolve({ fileID, closeWs: () => ws.terminate() })
        }
      })
    })
  }
}
