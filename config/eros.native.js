module.exports = {
  'appName': 'weexeros',
  'appBoard': '/config/index.js',
  // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
  'androidIsListenHomeBack': 'true',
  'customBundleUpdate': 'false',
  'version': {
    'android': '1.0.0',
    'iOS': '1.0.0'
  },
  'page': {
    'homePage': 'tabBar',
    'mediatorPage': '/mediator/index.js',
    'navBarColor': '#1DA1F2',
    'navItemColor': '#ffffff'
  },
  'url': {
    'image': 'https://lev-inf.benmu-health.com/test/xxx',
    'bundleUpdate': 'http://localhosts:3001/app/check'
  },
  'zipFolder': {
    'iOS': '/ios/WeexEros/WeexEros',
    'android': '/android/WeexFrameworkWrapper/app/src/main/assets'
  },
  'getui': {
    'enabled': 'false',
    'appId': '',
    'appKey': '',
    'appSecret': ''
  },
  'tabBar': {
    'color': '#777777',
    'selectedColor': '#00b4cb',
    'backgroundColor': '#fafafa',
    'borderColor': '#dfe1eb',
    'list': [{
      'pagePath': '/pages/hello.js',
      'text': '首页',
      'icon': 'bmlocal://assets/TabBar_Item1@2x.png',
      'selectedIcon': 'bmlocal://assets/TabBar_Item1_Selected@2x.png',
      'navShow': 'true',
      'navTitle': '首页'
    }]
  }
}
