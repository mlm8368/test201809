import Widget from './widget'
import apis from './apis'
import routes from './routes'
import './push'
import { config } from './app'

const widget = new Widget({
  router: {
    /**
     * 路由配置表
     */
    routes
  },
  ajax: {
    baseUrl: config.site.apiUrl,
    // baseUrl: 'http://localhost/appdata/1.1',
    // baseUrl: 'http://v7.dog1314.com/appdata/1.1',
    /**
           * 接口别名
           */
    apis,
    // 接口超时时间
    timeout: 30000,

    /**
     * 请求发送统一拦截器 （可选）
     * options 你请求传入的所有参数和配置
     * next
     */
    requestHandler(options, next) {
      // console.log('request-opts', options)
      next()
    },
    /**
     * 请求返回统一拦截器 （可选）
     * options 你请求传入的所有参数和配置
     * resData 服务器端返回的所有数据
     * resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
     * reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
     */
    responseHandler(options, resData, resolve, reject) {
      //console.log("#debug# ", resData)
      const { status, data } = resData
      if (status !== 200) {
        reject(resData)
      } else {
        // 未登录或登录失效
        if (data.status === -999) {
          let event = weex.requireModule('bmEvents')
          event.emit('login.openpage')
          event = null
          return false
        }
        
        resolve(data)
      }
    }
  }
})

Vue.config.errorHandler = function (err, vm, info) {
  vm.$fetch({
    url: config.site.apiUrl + '/index.php?action=errorlog',
    method: 'POST',
    data: {
      url: `${info}`,
      refer: `${err}`
    }
  }).then(resData => { }, error => { })
}

Vue.config.warnHandler = function (msg, vm, trace) {
  vm.$fetch({
    url: config.site.apiUrl + '/index.php?action=errorlog',
    method: 'POST',
    data: {
      url: 'warn',
      refer: `${msg}`
    }
  }).then(resData => { }, error => { })
}
