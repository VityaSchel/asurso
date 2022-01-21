import fetch from 'node-fetch'
import cookie from 'cookie'
import md5 from 'md5'
import { parse as htmlParser } from 'node-html-parser'

export default class Login {
  async login(tokens) {
    if(tokens) {
      this.atKey = tokens.atKey
      this.sessionToken = tokens.sessionToken
    } else {
      const authSessionResponse = await fetch('https://asurso.ru/webapi/auth/getdata', {
        method: 'POST'
      })
      const nSessionID = cookie.parse(authSessionResponse.headers.get('set-cookie'))['NSSESSIONID']
      const authSessionDetails = await authSessionResponse.json()

      const passwordHash = md5(authSessionDetails.salt + md5(this.loginDetails.password))
      const body = {
        LoginType: 1,
        cid: this.loginDetails.countryID,
        sid: this.loginDetails.regionID,
        pid: this.loginDetails.regionAreaID,
        cn: this.loginDetails.cityID,
        sft: this.loginDetails.schoolTypeID,
        scid: this.loginDetails.schoolID,
        UN: this.loginDetails.login,
        PW: passwordHash.substring(0, 9),
        lt: authSessionDetails.lt,
        pw2: passwordHash,
        ver: authSessionDetails.ver,
      }
      const loginAttempt = await fetch('https://asurso.ru/webapi/login', {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          Cookie: cookie.serialize('NSSESSIONID', nSessionID),
          'X-Requested-With': 'XMLHttpRequest'
        },
        referrer: 'https://asurso.ru/about.html',
      })

      const loginResult = await loginAttempt.json()

      this.atKey = loginResult.at
      this.sessionToken = cookie.parse(loginAttempt.headers.get('set-cookie'))['ESRNSec']
    }
    this.studentID = await this.getStudentID()
    this.yearID = await this.getYearID()
    return { atKey: this.atKey, sessionToken: this.sessionToken }
  }

  async getStudentID() {
    let sessionDetails
    try {
      sessionDetails = await this.fetch('https://asurso.ru/webapi/student/diary/init')
    } catch(e) {
      if(e.message === 'Unexpected token < in JSON at position 0') throw 'Incorrect login data or session expired'
      else throw e
    }
    const studentId = sessionDetails.students[0].studentId
    return studentId
  }

  async getYearID() {
    const htmlResponse = await this.fetch('https://asurso.ru/angular/school/main/', {
      method: 'POST',
      body: new URLSearchParams({ AT: this.atKey })
    }, false)
    const html = await htmlResponse.text()
    const root = htmlParser(html)
    const javascripts = root.querySelectorAll('head script[type="text/javascript"]:not([src])').map(script => script.innerHTML)

    // Try to find better way to do that:
    // 1. No API endpoint for getting yearID
    // 2. No safe method of eval() found on internet (safe-eval compromised, babel-parser is not a solution)
    // 3. JS-sandbox is too costly and won't work in browser
    // Current implementation is the most secure and optimized way to get important data.
    // Please open an issue if you found a better way to do that.
    for (let script of javascripts){
      const yearID = script.match(/appContext\.yearId = "(\d+)"/)?.[1]
      if(yearID) return Number(yearID)
    }
  }
}
