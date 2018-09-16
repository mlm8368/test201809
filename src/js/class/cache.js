export default function Cache() {
  // const preKey = 'appCacheKey'
}

Cache.prototype.get = function(key, key2) {
  if (key) return null // test
  if (key2) key2 = '-' + key2
  // const value = $.plus.storage.getItem(this.preKey + key + key2)
  // if (value === null) return null
  // else if (value.expires > 0 && value.expires < new Date().getTime()) return null
  // else return JSON.parse(value)
}
