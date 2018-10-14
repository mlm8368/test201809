import Home from './home.class'

export default class Classes extends Home {
  constructor() {
    super()
    return this
  }

  editClasses(op) {
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.classes',
      params: { query: '&action=edit' },
      header: this.ajaxHeader(),
      data: this.Vue.formData
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.lists = ret.lists
        this.cacheClasses('set', this.Vue.lists)

        let message = '修改成功'
        if (op === 'add') message = '添加成功'
        this.Vue.$notice.alert({ message: message })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }

  delClasses() {
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.classes',
      params: { query: '&action=del' },
      header: this.ajaxHeader(),
      data: { id: this.Vue.formData.id }
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.lists = ret.lists
        this.cacheClasses('set', this.Vue.lists)
        this.Vue.$notice.alert({ message: '删除成功' })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }
}
