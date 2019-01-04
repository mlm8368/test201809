import Abstract from '../../class/abstract'
import { appStorageKey } from '../../class/enum'
import { footBarDefault, footBarSchool } from './login.config'
import { config } from '../../config/app'

const tabbar = weex.requireModule('bmTabbar')

export default class Login extends Abstract {
  constructor() {
    super()
    return this
  }

  doLogin() {
    const mobile = this.Vue.mobile
    const password = this.Vue.password

    if (this.checkMobile(mobile) === false) {
      this.Vue.$notice.alert({ message: '请填写正确手机号' })
      return false
    }
    if (password.length < 6) {
      this.Vue.$notice.alert({ message: '请填写6位数以上的密码' })
      return false
    }

    const uData = {}
    uData['submit'] = 1
    uData['mobile'] = mobile
    uData['password'] = password

    this.Vue.loadShow = true
    this.Vue.$fetch({
      method: 'POST',
      name: 'modules.member',
      params: { query: '&action=login' },
      header: this.ajaxHeader(false),
      data: uData
    }).then(ret => {
      this.Vue.loadShow = false
      if (ret.status === 1) {
        this.setLoginData(ret.userInfo)

        this.Vue.$notice.alert({ message: '登录成功', callback: () => {
          this.Vue.$router.back({ type: 'PRESENT' })
        } })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
      this.Vue.loadShow = false
    })
  }
}
