import Home from './home.class'

export default class TeacherAdd extends Home {
  constructor() {
    super()
    return this
  }

  searchTeacher (keywords) {
    this.Vue.searchMsg = ''
    this.Vue.searchTeachers = []
    this.Vue.searchTeacherIndex = -1

    this.Vue.$notice.loading.show('正在检索...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=teacher&op=search' },
      header: this.ajaxHeader(),
      data: { keywords: keywords }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.searchTeachers = this.outTeacher(ret.lists)
      } else {
        this.Vue.searchMsg = ret.msg
      }
    }, error => {
    })
  }

  outTeacher (lists) {
    const teacherLists = []
    lists.forEach((one) => {
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

      teacherLists.push(tmp)
    })
    return teacherLists
  }

  addTeacher () {
    const postData = { id: this.Vue.teacherInfo.id, teacheruserid: this.Vue.teacherInfo.userid, teacherpost: '', classesid: this.Vue.classesid }

    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.classes',
      params: { query: '&action=teacher&op=add' },
      header: this.ajaxHeader(),
      data: postData
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.$parent.getTeacherLists('refresh')

        this.Vue.$notice.alert({ message: '添加成功', callback: () => {
          this.Vue.searchMsg = ''
          this.Vue.searchTeachers = []
          this.Vue.searchTeacherIndex = -1
          this.Vue.$parent.closeDialog()
        } })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }
}
