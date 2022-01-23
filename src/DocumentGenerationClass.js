import { dateValidator, validateSchema } from './utils.js'
import * as yup from 'yup'
import WebSocket from 'ws'
import cookie from 'cookie'
import XLSX from 'xlsx'
import htmlParser from 'node-html-parser'
import fs from 'fs/promises'

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
    const generatedDocument = await this.fetch(`https://asurso.ru/webapi/files/${fileID}`, {}, false)
    return {
      __file__: generatedDocument,
      download: function () { return this.__file__ },
      parse: async function () {
        if(!htmlVersion) throw 'PDF tables parsing is not supported'

        const file = await this.__file__.text()
        const root = htmlParser.parse(file)
        let table = root.querySelector('table.table-print')
        table.removeWhitespace()

        const heading = table.childNodes[0].childNodes
        const headingDates = table.childNodes[1].childNodes
        const mergedDates = []
        for(let i = 1; i < heading.length-1; i++){
          const month = heading[i].innerText
          const monthDays = heading[i].getAttribute('colspan')
          mergedDates.push(...new Array(Number(monthDays)).fill().map((_,j) => [month, headingDates[j].innerText]))
        }

        headingDates[0].parentNode.remove()
        const averageMarkCol = heading[heading.length - 1]
        for(let i = 1; i < heading.length; i++) heading[i].remove()
        const subjectCol = heading[0]
        const headingRow = subjectCol.parentNode
        subjectCol.removeAttribute('rowspan')
        mergedDates.forEach(date => {
          headingRow.appendChild(htmlParser.parse(`<th>${date[0]}_${date[1]}</th>`))
        })
        averageMarkCol.removeAttribute('rowspan')
        headingRow.appendChild(averageMarkCol)

        table = root.querySelector('table.table-print')
        fs.writeFile('4', table.toString())

        const book = XLSX.read(table.toString(), { type: 'string' })
        const sheet = XLSX.utils.sheet_to_json(Object.values(book.Sheets)[0])
        sheet.shift()
        const marks = Object.fromEntries(
          sheet
            .map(classInfo => [
              classInfo.Предмет,
              Object.fromEntries(
                Object.entries(classInfo)
                  .filter(([key,]) => !['Предмет','__rowNum__'].includes(key))
                  .map(([dateName, mark]) =>
                    dateName === 'Средняя оценка'
                      ? ['average', mark]
                      : [dateName, mark]
                  )
              )
            ])
        )
        return marks
      }
    }
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
