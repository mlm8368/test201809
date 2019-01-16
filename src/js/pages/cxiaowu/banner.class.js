import App from './app.class'

export default class Banner extends App {
  constructor() {
    super()
    return this
  }
  
  updateBanner(banners, delpic=null) {
    let formData = {}
    if(delpic) formData['delpic'] = delpic 
    banners.forEach((img, index)=>{  
    	formData['banner' + (index+1)] = img
	})
    this.Vue.$notice.loading.show('正在提交...')
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.member',
      params: { query: '&action=updatebanner' },
      header: this.ajaxHeader(),
      data: formData
    }).then(ret => {
      this.Vue.$notice.loading.hide()

      if (ret.status === 1) {
        this.Vue.banners = banners
        //this.Vue.$store.commit('updateProfileStatus')
        this.Vue.$notice.toast({ message: '修改成功'})
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {})
  }
}

