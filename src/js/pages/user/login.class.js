import Abstract from '../../class/abstract'
import { appStorageKey } from '../../class/enum'
import { appName, footBarSchool } from './login.config'

const tabbar = weex.requireModule('bmTabbar')

export default class Login extends Abstract {
  constructor(Vue) {
    super(Vue)
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
        // const that = this
        this.Vue.$notice.alert({ message: '登录成功', callback: () => {
          this.goPortal()
        } })
      } else {
        this.Vue.$notice.alert({ message: ret.msg })
      }
    }, error => {
      this.Vue.loadShow = false
    })
  }

  goPortal() {
    switch (appName) {
      case 'student':
        if (this.getStorage(appStorageKey.groupid) === 5) this.goPortalStudent()
        break
      case 'school':
        if (this.getStorage(appStorageKey.groupid) === 6) this.goPortalSchool()
        else if (this.getStorage(appStorageKey.groupid) === 5) this.goPortalTeacher()
        break
      case 'allapp':
        if (this.getStorage(appStorageKey.groupid) === 6) this.goPortalSchool()
        else if (this.getStorage(appStorageKey.userInfo).student) this.goPortalStudent()
        else if (this.getStorage(appStorageKey.groupid) === 5) this.goPortalTeacher()
        else this.goPortalTeacher()
        break
    }
  }

  goPortalSchool() {
    const footbar = tabbar.getInfo()
    footbar.list = footBarSchool
    tabbar.setInfo(footbar)

    this.Vue.$router.back({ type: 'PRESENT' })
  }
  goPortalTeacher() {
    this.log('goPortalTeacher')
  }
  goPortalStudent() {
    this.log('goPortalStudent')
  }

  setLoginData(userInfo, updateAccessToken = true) {
    this.setStorage(appStorageKey.userid, userInfo.userid)
    this.setStorage(appStorageKey.username, userInfo.username)
    if (updateAccessToken) this.setStorage(appStorageKey.accessToken, userInfo.accessToken)
    this.setStorage(appStorageKey.groupid, userInfo.groupid)
    this.setStorage(appStorageKey.area, userInfo.area)
    this.setStorage(appStorageKey.areaid, userInfo.areaid)
    this.setStorage(appStorageKey.userInfo, userInfo)
  }
  clearLoginData() {
    this.rmStorage(appStorageKey.userid)
    this.rmStorage(appStorageKey.username)
    this.rmStorage(appStorageKey.accessToken)
    this.rmStorage(appStorageKey.groupid)
    this.rmStorage(appStorageKey.area)
    this.rmStorage(appStorageKey.areaid)
    this.rmStorage(appStorageKey.userInfo)
  }
}
