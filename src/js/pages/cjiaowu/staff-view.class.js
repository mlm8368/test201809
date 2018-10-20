import Staff from './staff.class'

export default class StaffView extends Staff {
  constructor() {
    super()
    return this
  }

  outStaff (one) {
    const tmp = {}
    tmp['id'] = one.id
    tmp['userid'] = one.userid
    tmp['truename'] = one.truename
    tmp['avatar'] = this.getAvatar(one.avatar)
    tmp['gender'] = this.getGender(one.gender)
    tmp['mobile'] = one.mobile
    tmp['qq'] = one.qq
    tmp['wx'] = one.wx
    tmp['jointime'] = one.jointime

    if (one.agree === -1) {
      tmp['agree'] = '已拒绝'
    } else if (one.agree === 0) {
      tmp['agree'] = '待确认'
    } else if (one.agree === 1) {
      tmp['agree'] = '已入职'
    }
    return tmp
  }
}
