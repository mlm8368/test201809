import School from '../../class/school.class'

export default class App extends School {
  constructor() {
    super()
    return this
  }

  getSchool (callback) {
    const userinfo = this.cacheSchool('get')
    if (userinfo !== null) {
      if(callback) callback(userinfo)
      return
    }

    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.member',
      params: { query: '&action=getuserinfo' },
      header: this.ajaxHeader()
    }).then(ret => {
      if (ret.status === 1) {
        if(callback) callback(ret.userinfo)
        this.cacheSchool('set', ret.userinfo)
      }
    }, error => {
    })
  }

  cacheSchool (op, userinfo = null) {
    const schoolid = this.Vue.schoolid
    const cacheParam = schoolid
    let cacheData = null

    if (op === 'get') {
      cacheData = this.cache.get(this.appCacheKey.school_cxiaowu_userinfo)
      if (cacheData !== null && cacheData.param === cacheParam) return cacheData.value
      else return null
    } else if (op === 'set') {
      cacheData = { param: cacheParam, value: userinfo }
      this.cache.set(this.appCacheKey.school_cxiaowu_userinfo, cacheData)
    }
  }
}
