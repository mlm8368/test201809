import { appStorageKey, appCacheKey } from './enum'
import Cache from './cache'
import { config } from '../config/app'

export default class Abstract {
  Vue = null
  DATE_TIME = new Date()

  constructor() {
    this.appStorageKey = appStorageKey
    this.appCacheKey = appCacheKey
    this.cache = new Cache()
    this.config = config
    return this
  }
  setVue(Vue) {
    this.Vue = Vue
    this.cache.setVue(Vue)
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
  isEmptyObject (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
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

  isLogin() {
    return 0 // test
    // return (this.getStorage(appStorageKey.accessToken)) ? 1 : 0
  }
  
  setLoginData(userInfo, updateAccessToken = true) {
    this.setStorage(appStorageKey.userid, userInfo.userid)
    this.setStorage(appStorageKey.username, userInfo.username)
    if (updateAccessToken) this.setStorage(appStorageKey.accessToken, userInfo.accessToken)
    this.setStorage(appStorageKey.groupid, userInfo.groupid)
    this.setStorage(appStorageKey.area, userInfo.area)
    this.setStorage(appStorageKey.areaid, userInfo.areaid)
    this.setStorage(appStorageKey.userInfo, userInfo)
  }
  
  clearLoginData() {
    this.rmStorage(appStorageKey.userid)
    this.rmStorage(appStorageKey.username)
    this.rmStorage(appStorageKey.accessToken)
    this.rmStorage(appStorageKey.groupid)
    this.rmStorage(appStorageKey.area)
    this.rmStorage(appStorageKey.areaid)
    this.rmStorage(appStorageKey.userInfo)
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
    if (!url) url = 'bmlocal://assets/defaultAvatar.png'
    return url
  }
  getAge(beginStr, endStr) {
    var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
    var beginArr = beginStr.match(reg);
    var endArr = endStr.match(reg);

    var days = 0;
    var month = 0;
    var year = 0;

    days = endArr[4] - beginArr[4];
    if (days < 0) {
      month = -1;
      days = 30 + days;
    }

    month = month + (endArr[3] - beginArr[3]);
    if (month < 0) {
      year = -1;
      month = 12 + month;
    }

    year = year + (endArr[1] - beginArr[1]);

    var yearString = year > 0 ? year + '岁' : '';
    var mnthString = month > 0 ? month + '月' : '';
    var dayString = days > 0 ? days + '天' : '';

    return yearString + mnthString + dayString;

    /*
    // 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0天小于3天 取小时
    // 例如出生2天 就取 48小时
    var result = '';
    if (year >= 1) {
      result = yearString + mnthString;
      if(days > 0) result += dayString;
    } else {
      if (month >= 1) {
        result = days > 0 ? mnthString + dayString : mnthString;
      } else {
        var begDate = new Date(beginArr[1], beginArr[3] - 1,
          beginArr[4], beginArr[6], beginArr[8], beginArr[10]);
        var endDate = new Date(endArr[1], endArr[3] - 1, endArr[4],
          endArr[6], endArr[8], endArr[10]);

        var between = (endDate.getTime() - begDate.getTime()) / 1000;
        days = Math.floor(between / (24 * 3600));
        var hours = Math.floor(between / 3600 - (days * 24));
        dayString = days > 0 ? days + '天' : '';
        result = days >= 3 ? dayString : days * 24 + hours + '小时';
      }
    }

    return result;
    */
  }
  getFormatDate(date) {
    if(!date) date= this.DATE_TIME
    const seperator1 = '-'
    const month = date.getMonth() + 1
    let month2 = ''
    const strDate = date.getDate()
    let strDate2 = ''
    if (month >= 1 && month <= 9) month2 = '0' + month
    else month2 = '' + month
    if (strDate >= 0 && strDate <= 9) strDate2 = '0' + strDate
    else strDate2 = '' + strDate
    return date.getFullYear() + seperator1 + month2 + seperator1 + strDate2
  }
  checkMobile(mobile) {
    const mobileReg = /^1[0-9]{10}$/
    return mobileReg.test(mobile)
  }

  getFileExt(fileName) {
    return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  }

  uuid(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    let i
    radix = radix || chars.length
    if (radix > chars.length) radix = chars.length

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      let r

      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'

      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }

  getBosAck(callback) {
    this.Vue.$fetch({
      url: config.bos.ackUrl,
      method: 'GET',
      data: {
        policy: 'dogquan'
      }
    }).then(resData => {
      // 成功回调
      // profile.log(resData)
      if (callback) callback(resData)
    }, error => {
      // 错误回调
      // profile.log(error)
    })
  }

  getBosObjectKey(type, ext) {
    const _uuid = this.uuid(8);
    
    const date = new Date();
    if(type === 'avatar') {
        const hour = date.getHours()
        const minute = date.getMinutes()
		return 'avatar/' + _uuid + hour + minute + '.' + ext;
	}
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const key = type + '/' + year + '/' + month + '/' + _uuid + '.' + ext;

    return key
  }
}
