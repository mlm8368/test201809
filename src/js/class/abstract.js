export default class Abstract {
  constructor () {
    return this
  }
  byId(id) {
    return document.getElementById(id)
  }
  closest(el, selector) {
    let doms
    let targetDom
    const isSame = (doms, el) => {
      let i = 0
      const len = doms.length
      for (i; i < len; i++) {
        if (doms[i].isEqualNode(el)) {
          return doms[i]
        }
      }
      return false
    }
    const traversal = (el, selector) => {
      doms = el.parentNode.querySelectorAll(selector)
      targetDom = isSame(doms, el)
      if (!targetDom) {
        el = el.parentNode
        if (el != null && el.nodeType === el.DOCUMENT_NODE) {
          return false
        }
        traversal(el, selector)
      }
      return targetDom
    }
    return traversal(el, selector)
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
    localStorage[key] = value
  }
  getStorage(key) {
    let v = localStorage[key]
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
    localStorage[key] = value
  }
  getStorageJson(key) {
    return localStorage[key]
  }
  rmStorage(key) {
    delete localStorage[key]
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
