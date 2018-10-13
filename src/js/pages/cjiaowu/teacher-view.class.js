import Home from './home.class'

export default class TeacherView extends Home {
  constructor() {
    super()
    return this
  }

  outTeacher (one) {
    const tmp = {}
    tmp['id'] = one.id
    tmp['teacherpost'] = one.teacherpost
    tmp['userid'] = one.userid
    tmp['truename'] = one.truename
    tmp['avatar'] = this.getAvatar(one.avatar)
    tmp['gender'] = this.getGender(one.gender)
    tmp['mobile'] = one.mobile
    tmp['qq'] = one.qq
    tmp['wx'] = one.wx
    return tmp
  }
}
