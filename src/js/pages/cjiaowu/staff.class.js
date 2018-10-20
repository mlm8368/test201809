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
    let total = 0
    let totalToAgree = 0
    let totalNotAgree = 0
    lists.forEach((one) => {
      const tmp = {}
      tmp['id'] = one.id
      tmp['agree'] = one.agree
      tmp['userid'] = one.userid
      tmp['truename'] = one.truename
      tmp['mobile'] = one.mobile
      tmp['avatar'] = this.getAvatar(one.avatar)
      /*
      tmp['gender'] = this.getGender(one.gender)
      tmp['qq'] = one.qq
      tmp['wx'] = one.wx
      */

      staffLists.push(tmp)

      if (one.agree === 1) total++
      else if (one.agree === 0) totalToAgree++
      else if (one.agree === -1) totalNotAgree++
    })

    this.Vue.total = total
    this.Vue.totalToAgree = totalToAgree
    this.Vue.totalNotAgree = totalNotAgree
    return staffLists
  }

  searchStaff (mobile) {
    this.Vue.searchMsg = ''
    this.Vue.searchStaff = null

    this.Vue.$notice.loading.show('正在检索...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.school',
      params: { query: '&action=staff&op=search' },
      header: this.ajaxHeader(),
      data: { mobile: mobile }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        let tmpArr = []
        tmpArr.push(ret.userinfo)
        tmpArr = this.outStaff(tmpArr)

        this.Vue.searchStaff = tmpArr[0]
        this.Vue.searchMsg = ''
      } else {
        this.Vue.searchStaff = null
        this.Vue.searchMsg = ret.msg
      }
    }, error => {
    })
  }

  addStaff () {
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.school',
      params: { query: '&action=staff&op=add' },
      header: this.ajaxHeader(),
      data: { teacherid: this.Vue.searchStaff.userid }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.getStaffLists('refresh')

        this.Vue.$notice.alert({ message: '添加成功', callback: () => {
          this.Vue.searchMsg = ''
          this.Vue.searchStaff = null
        } })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }

  delStaff(index) {
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.school',
      params: { query: '&action=staff&op=del' },
      header: this.ajaxHeader(),
      data: { id: this.Vue.lists[index].id }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.getStaffLists('refresh')

        this.Vue.$notice.alert({ message: '删除成功' })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }
}
