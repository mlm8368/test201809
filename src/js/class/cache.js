export default class Cache {
  Vue = null
  preKey = 'appCacheKey'

  constructor () {
    return this
  }
  setVue(Vue) {
    this.Vue = Vue
  }
  /**
   * getItem
   */
  get (key, key2 = '') {
    if (key) return null // test
    if (key2) key2 = '-' + key2
    const value = this.Vue.$storage.getSync(this.preKey + key + key2)
    if (value === null) return null
    else if (value.expires > 0 && value.expires < new Date().getTime()) return null
    else return value
  }

  /**
   * setItem
   */
  set (key, value = { param: null, values: null }, expires = 0, key2 = '') {
    if (key2) key2 = '-' + key2
    if (expires > 0) expires = new Date().getTime() + expires * 1000
    value['expires'] = expires

    this.Vue.$storage.setSync(this.preKey + key + key2, value)
  }

  /**
   * removeItem
   */
  remove (key, key2 = '') {
    if (key2) key2 = '-' + key2
    this.Vue.$storage.deleteSync(this.preKey + key + key2)
  }

  /**
   * clear
   */
  clearAll () {
    this.Vue.$storage.removeAllSync()
  }

  setCacheKeys (key, expires) {
    const cacheKey = 'collectAllCacheKeys'
    if (expires > 0) expires = new Date().getTime() + expires * 1000

    let allKeys = this.Vue.$storage.getSync(cacheKey)
    if (allKeys === null) allKeys = {}
    else allKeys = JSON.parse(allKeys)

    allKeys[this.preKey + key] = expires
    this.Vue.$storage.setSync(cacheKey, JSON.stringify(allKeys))
  }
}
