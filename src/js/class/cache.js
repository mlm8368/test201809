export default class Cache {
  preKey = 'appCacheKey'

  constructor () {
    return this
  }
  /**
   * getItem
   */
  get (key, key2 = '') {
    if (key) return null // test
    if (key2) key2 = '-' + key2
    const value = Vue.$storage.getSync(this.preKey + key + key2)
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

    Vue.$storage.setSync(this.preKey + key + key2, value)
  }

  /**
   * removeItem
   */
  remove (key, key2 = '') {
    if (key2) key2 = '-' + key2
    Vue.$storage.deleteSync(this.preKey + key + key2)
  }

  /**
   * clear
   */
  clearAll () {
    Vue.$storage.removeAllSync()
  }

  setCacheKeys (key, expires) {
    const cacheKey = 'collectAllCacheKeys'
    if (expires > 0) expires = new Date().getTime() + expires * 1000

    let allKeys = Vue.$storage.getSync(cacheKey)
    if (allKeys === null) allKeys = {}
    else allKeys = JSON.parse(allKeys)

    allKeys[this.preKey + key] = expires
    Vue.$storage.setSync(cacheKey, JSON.stringify(allKeys))
  }
}
