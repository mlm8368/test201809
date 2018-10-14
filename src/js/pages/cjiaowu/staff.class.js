import Home from './home.class'

export default class Staff extends Home {
  constructor() {
    super()
    return this
  }

  getStaffLists(callback) {
    const lists = this.cacheStaffs('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.school',
      params: { query: '&action=staff&op=list' },
      header: this.ajaxHeader()
    }).then(ret => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheStaffs('set', ret.lists)
      }
    }, error => {
    })
  }

  cacheStaffs (op, lists = null) {
    const schoolid = this.Vue.schoolid
    const cacheParam = schoolid
    let staffs = null

    if (op === 'get') {
      staffs = this.cache.get(this.appCacheKey.school_cjiaowu_staffs)
      if (staffs !== null && staffs.param === cacheParam) return staffs.value
      else return null
    } else if (op === 'set') {
      staffs = { param: cacheParam, value: lists }
      this.cache.set(this.appCacheKey.school_cjiaowu_staffs, staffs)
    }
  }

  outStaff (lists) {
    const staffLists = []
    lists.forEach((one) => {
      const tmp = {}
      tmp['id'] = one.id
      tmp['agree'] = one.agree
      tmp['userid'] = one.userid
      tmp['truename'] = one.truename
      tmp['mobile'] = one.mobile
      /*
      tmp['avatar'] = this.getAvatar(one.avatar)
      tmp['gender'] = this.getGender(one.gender)
      tmp['qq'] = one.qq
      tmp['wx'] = one.wx
      */

      staffLists.push(tmp)
    })
    return staffLists
  }
}
