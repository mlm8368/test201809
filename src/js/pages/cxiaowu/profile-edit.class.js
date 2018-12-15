//import { Auth } from 'bce-sdk-js'
import App from './app.class'

export default class ProfileEdit extends App {
  constructor() {
    super()
    return this
  }
  
  outFormdata (one) {
    //this.log(one)
    /*
    this.log(one)
    const tmp = {
        type: [],  //公立学校,私立学校,培训机构,其他
        catid: [],  //幼教启蒙班,幼教小班,英语培训班,舞蹈培训班,武术培训班
        business: '', //教学 培训 一对一培训
        regyear: 2018,
        mode: [], //全日制教学,培训班,一对一教学
        size: [], //1-9人,10-29人
        regunit: [], //人民币,美元
        capital: 0, //万,
        areaid: [],
        address: '',
        postcode: '',
        thumb: '',
        telephone: '',
        fax: '',
        mail: '',
        homepage: '',
        gzh: '',
        gzhqr: '',
        content: '',
        mobile: '',
        truename: '',
        gender: '',
        department: '',
        career: '',
        qq: '',
        wx: ''
      }
    */
    for(const key of Object.keys(this.Vue.formData)){
      if (!one[key]) continue

      if (key === 'type') this.Vue.formData.type.push(one.type)
      else if (key === 'size') this.Vue.formData.size.push(one.size)
      else if (key === 'regunit') this.Vue.formData.regunit.push(one.regunit)
      else if (key === 'areaid') {
        this.Vue.formData.areaid = one.areaid
        this.Vue.areaname = one.areaname
      }
      else if(key === 'thumb') this.Vue.formData.thumb = this.getAvatar(one.thumb) 
      else this.Vue.formData[key] = one[key]
    }
    //this.log(this.Vue.formData)
  }
  
}
