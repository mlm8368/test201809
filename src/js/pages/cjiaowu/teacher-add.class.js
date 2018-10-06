import School from '../../class/school.class'

export default class TeacherAdd extends School {
  constructor() {
    super()
    return this
  }

  searchTeacher (keywords) {
    this.Vue.$notice.loading.show('正在检索...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=teacher&op=search' },
      header: this.ajaxHeader(),
      data: { keywords: keywords }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      this.Vue.searchMsg = ''
      this.Vue.searchTeachers = []
      this.Vue.searchTeacherIndex = -1
      this.Vue.teacherInfo = null
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
      tmp['truename'] = one.truename
      tmp['avatar'] = this.getAvatar(one.avatar)

      teacherLists.push(tmp)
    })
    return teacherLists
  }
}
