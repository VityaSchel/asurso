import fetch from 'node-fetch'
import cookie from 'cookie'
import md5 from 'md5'

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
    this.studentId = await this.getStudentId()
    return { atKey: this.atKey, sessionToken: this.sessionToken }
  }

  async getStudentId() {
    const initResponse = await fetch('https://asurso.ru/webapi/student/diary/init')
    const sessionDetails = await initResponse.json()
    const studentId = sessionDetails.students[0].studentId
    return studentId
  }
}
