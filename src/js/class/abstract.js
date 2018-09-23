import { appStorageKey } from './enum'

export default class Abstract {
  Vue = null

  constructor (Vue) {
    this.Vue = Vue
    return this
  }
  log(str) {
    const myarraylist = str;
    if (typeof str === 'object') {
      if (Array.isArray(str)) {
        let index;
        const json = {};
        for (index in myarraylist) {
          json[index] = myarraylist[index];
        }
        str = JSON.stringify(json);
      } else {
        str = JSON.stringify(str);
      }
    }
    // console.log(str);
    this.Vue.$notice.alert({ message: str, okTitle: '确定', title: 'DEBUG' })
  }
  byId(id) {
    return document.getElementById(id)
  }
  jsonToStr(json) {
    return JSON && JSON.stringify(json)
  }
  strToJson(str) {
    return JSON && JSON.parse(str)
  }
  objToArray(object) {
    const array = []
    for (const key in object) {
      array.push(object[key])
    }
    return array
  }
  setStorage(key, value) {
    if (typeof value === 'object') {
      if (value === null) {
        value = 'objnull-null'
      } else {
        value = JSON.stringify(value)
        value = 'obj-' + value
      }
    } else if (typeof value === 'number') {
      value = 'num-' + value
    } else if (typeof value === 'boolean') {
      if (value === false) value = 0
      else value = 1
      value = 'bool-' + value
    } else {
      value = 'str-' + value
    }
    this.Vue.$storage.setSync(key, value)
  }
  getStorage(key) {
    let v = this.Vue.$storage.getSync(key)
    if (!v) return null
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4)
      return JSON.parse(v)
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4)
    } else if (v.indexOf('num-') === 0) {
      return Number(v.slice(4))
    } else if (v.indexOf('bool-') === 0) {
      return Boolean(v.slice(5))
    } else if (v.indexOf('objnull-') === 0) {
      return null
    }
  }
  setStorageJson(key, value) {
    this.Vue.$storage.setSync(key, value)
  }
  getStorageJson(key) {
    return this.Vue.$storage.getSync(key)
  }
  rmStorage(key) {
    this.Vue.$storage.deleteSync(key)
  }

  setFontFace() {
    const dom = weex.requireModule('dom')
    dom.addRule('fontFace', {
      'fontFamily': 'SchoolIconFont',
      'src': 'url(\'bmlocal://iconfont/iconfont-school.ttf\')'
    })
  }

  isLogin() {
    return 0 // test
    // return (this.getStorage(appStorageKey.accessToken)) ? 1 : 0
  }

  ajaxHeader(appacctoken = true) {
    const header = { 'Content-Type': 'application/x-www-form-urlencoded' }
    if (appacctoken) header['APPACCTOKEN'] = this.getStorage(appStorageKey.accessToken)
    return header
  }
  getGender(gender, typeid = 0) {
    const genderName = []
    genderName.push({ 1: '男', 2: '女' })

    return genderName[typeid][gender]
  }
  getAvatar(url) {
    if (!url) url = '../../static/images/defaultAvatar.png'
    return url
  }
  checkMobile(mobile) {
    const mobileReg = /^1[0-9]{10}$/
    return mobileReg.test(mobile)
  }
}
