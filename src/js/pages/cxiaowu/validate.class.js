import App from './app.class'

export default class Validate extends App {
  constructor() {
    super()
    return this
  }
  
  getInfo() {
    const type = this.Vue.params
    
	this.Vue.$fetch({
      method: 'GET',
      name: 'modules.member',
      params: { query: '&action=validate&op=info&type=' + type },
      header: this.ajaxHeader()
    }).then(ret => {
      if (ret.status === 1) {
        this.Vue.name = ret.info.title
        this.Vue.thumbs = ret.info.thumbs
      }
    }, error => {
    })
  }
  
  update(index, imgUrl, callback){
    const type = this.Vue.params
    
    let formData = {title: this.Vue.name }
    if(index === 0) formData['thumb'] = imgUrl
    else formData['thumb'+index] = imgUrl
    
    this.Vue.$notice.loading.show('正在提交...') 
	this.Vue.$fetch({
      method: 'POST',
      name: 'modules.member',
      params: { query: '&action=validate&op=edit&type=' + type },
      header: this.ajaxHeader(),
      data: formData
    }).then(ret => {
      this.Vue.$notice.loading.hide()
      
      if (ret.status === 1) {
        this.Vue.$notice.toast({ message: '修改成功'}) 
        if(callback) callback()
      }
    }, error => {
    }) 
  }
  
}
