import App from './app.class'

export default class Grade extends App {
  constructor() {
    super()
    return this
  }
  
  buyVip() {
	this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({method: 'POST',name: 'modules.member',params: { query: '&action=grade' },header: this.ajaxHeader(),data: this.Vue.formData})
	.then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.$notice.alert({ title: '申请成功', message: '请耐心等待客服人员与您联系', okTitle: '确定'})
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {})
  }
}
