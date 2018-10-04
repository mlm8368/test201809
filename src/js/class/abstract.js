import { appStorageKey } from './enum'

export default class Abstract {
  Vue = null

  constructor (Vue) {
    this.Vue = Vue
    this.appStorageKey = appStorageKey
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
  checkMobile(mobile) {
    const mobileReg = /^1[0-9]{10}$/
    return mobileReg.test(mobile)
  }
}
