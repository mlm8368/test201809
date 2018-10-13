import Home from './home.class'

export default class StudentAdd extends Home {
  constructor() {
    super()
    return this
  }

  searchStudent (keywords) {
    this.Vue.searchMsg = ''
    this.Vue.studentInfo = null

    this.Vue.$notice.loading.show('正在检索...')
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=student&op=search' },
      header: this.ajaxHeader(),
      data: { keywords: keywords }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.studentInfo = this.outStudent(ret.studentInfo)
      } else {
        this.Vue.searchMsg = ret.msg
      }
    }, error => {
    })
  }

  outStudent (one) {
    const tmp = {}
    tmp['studentid'] = one.studentid
    tmp['babyname'] = one.babyname
    tmp['avatar'] = this.getAvatar(one.avatar)
    tmp['gender'] = this.getGender(one.gender)
    tmp['birthday'] = one.birthday
    tmp['parents'] = []
    if (one.parentcalls) {
      const parentcalls = one.parentcalls.split(',')
      const parenttruenames = one.parenttruenames.split(',')
      const parentmobiles = one.parentmobiles.split(',')

      parentcalls.forEach((value, index) => {
        const parent = {}
        parent['call'] = value
        parent['truename'] = parenttruenames[index]
        parent['mobile'] = parentmobiles[index]

        tmp.parents.push(parent)
      })
    }

    return tmp
  }

  addStudent () {
    const postData = { id: 0, classesid: this.Vue.classesid, studentid: this.Vue.studentInfo.studentid }

    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.classes',
      params: { query: '&action=student&op=add' },
      header: this.ajaxHeader(),
      data: postData
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.$parent.getStudentLists('refresh')

        this.Vue.$notice.alert({ message: '添加成功', callback: () => {
          this.Vue.searchMsg = ''
          this.Vue.studentInfo = null
          this.Vue.$parent.closeDialog()
        } })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }
}
