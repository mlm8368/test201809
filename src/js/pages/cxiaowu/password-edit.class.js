import App from './app.class'

export default class PasswordEdit extends App {
  constructor() {
    super()
    return this
  }
  
  editPassword() {
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.member',
      params: { query: '&action=setuserinfo&type=dlmi' },
      header: this.ajaxHeader(),
      data: this.Vue.formData
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.$notice.alert({ title: '密码修改成功', message: '请使用新密码重新登录', okTitle: '确定', callback(){
            this.clearLoginData()
			this.$router.open({ name: 'login', type: 'PRESENT' })
		}})
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
    })
  }
}
