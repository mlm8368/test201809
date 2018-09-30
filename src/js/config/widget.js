
// 配置方法
import '../../../node_modules/eros-widget/src/mixins.js'

import '../../../node_modules/eros-widget/src/font.js'
// 弹窗
import '../../../node_modules/eros-widget/src/notice.js'
// 获取地理位置
// import '../../../node_modules/eros-widget/src/geo.js'
// 获取相机信息
// import '../../../node_modules/eros-widget/src/camera.js'
// 图片操作相关
// import '../../../node_modules/eros-widget/src/image.js'
// 设置导航
import '../../../node_modules/eros-widget/src/nav.js'
// 支付相关(已抽离第三方插件)
// import '../../../node_modules/eros-widget/src/pay.js'
// bindingx
// import '../../../node_modules/eros-widget/src/bindingx.js'
// 存储相关
import '../../../node_modules/eros-widget/src/storage.js'
// 全局事件
import '../../../node_modules/eros-widget/src/events.js'
// 分享(已抽离第三方插件)
// import '../../../node_modules/eros-widget/src/share.js'
// 工具方法
// import '../../../node_modules/eros-widget/src/tools.js'

import '../../../node_modules/eros-widget/src/coms.js'

// 路由
import Router from '../../../node_modules/eros-widget/src/router.js'
// 发送请求
import Axios from '../../../node_modules/eros-widget/src/axios.js'

import Vuex from 'vuex'

let instance = null
export default class Widget {
	constructor ({ router, ajax }) {
		if (!instance) {
      Vue.use(Vuex)
			Vue.use(new Axios(ajax))
			Vue.use(new Router(router))
			instance = this
		}
    return instance
	}
}
