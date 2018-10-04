import Abstract from './abstract'

export default class School extends Abstract {
  constructor(Vue) {
    super(Vue)
    return this
  }

  getClasses (callback) {
    const lists = this.cacheClasses('get')
    if (lists !== null) {
      callback(lists)
      return
    }

    this.Vue.loadShow = true
    this.Vue.$fetch({
      method: 'GET',
      name: 'modules.classes',
      params: { query: '&action=list' },
      header: this.ajaxHeader()
    }).then(ret => {
      if (ret.status === 1) {
        callback(ret.lists)
        this.cacheClasses('set', ret.lists)
      }
    }, error => {
      this.Vue.loadShow = false
    }).catch((err) => {
      this.log(err)
    })
  }

  cacheClasses (op, lists = null) {
    const schoolid = this.getStorage(this.appStorageKey.userid)
    const cacheParam = schoolid
    let classes = null

    if (op === 'get') {
      classes = this._cache().get(this.appCacheKey.school_cjiaowu_classes)
      if (classes !== null && classes.param === cacheParam) return classes.value
      else return null
    } else if (op === 'set') {
      classes = { param: cacheParam, value: lists }
      this._cache().set(this.appCacheKey.school_cjiaowu_classes, classes)
    }
  }
}
