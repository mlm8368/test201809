export default class Cache {
  preKey = 'appCacheKey'

  constructor () {
    return this
  }
  /**
   * getItem
   */
  get (key, key2 = '') {
    // if (nodeEnv === 'development') return null // test
    if (key) return null // test
    if (key2) key2 = '-' + key2
    const value = Vue.plus.storage.getItem(this.preKey + key + key2)
    if (value === null) return null
    else if (value.expires > 0 && value.expires < new Date().getTime()) return null
    else return JSON.parse(value)
  }

  /**
   * setItem
   */
  set (key, value = { param: null, values: null }, expires = 0, key2 = null) {
    if (key2) key2 = '-' + key2
    if (expires > 0) expires = new Date().getTime() + expires * 1000
    value['expires'] = expires

    const valueJson = JSON.stringify(value)
    Vue.plus.storage.setItem(this.preKey + key + key2, valueJson)
  }

  /**
   * removeItem
   */
  remove (key, key2 = null) {
    if (key2) key2 = '-' + key2
    Vue.plus.storage.removeItem(this.preKey + key + key2)
  }

  /**
   * clear
   */
  clearAll () {
    Vue.plus.storage.clear()
  }

  setCacheKeys (key, expires) {
    const cacheKey = 'collectAllCacheKeys'
    if (expires > 0) expires = new Date().getTime() + expires * 1000

    let allKeys = Vue.plus.storage.getItem(cacheKey)
    if (allKeys === null) allKeys = {}
    else allKeys = JSON.parse(allKeys)

    allKeys[this.preKey + key] = expires
    Vue.plus.storage.setItem(cacheKey, JSON.stringify(allKeys))
  }
}
