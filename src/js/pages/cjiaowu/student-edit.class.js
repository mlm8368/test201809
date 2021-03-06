import Home from './home.class'

export default class StudentEdit extends Home {
  constructor() {
    super()
    return this
  }

  editStudent() {
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.classes',
      params: { query: '&action=student&op=edit' },
      header: this.ajaxHeader(),
      data: this.Vue.formData
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.$parent.getStudentLists('refresh')

        this.Vue.$notice.alert({ message: '修改成功', callback: () => {
          this.Vue.$parent.closeDialog()
        } })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }
}
