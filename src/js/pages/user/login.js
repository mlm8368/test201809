const tabPageHeight = WXEnvironment.deviceHeight
export default {
  name: 'login',
  data () {
    return {
      Totalheight: tabPageHeight,
      pressed: false,
      username: '',
      password: ''
    }
  },
  created () {
  },
  methods: {
    changeUsername(e) {
      this.username = e.value
    },
    changePassword(e) {
      this.password = e.value
    },
    submit() {
      const self = this
      if (self.username === '' || self.password === '') {
        this.$notice.alert({ message: '用户名或密码错误', okTitle: '确定', title: '' })
        return
      }

      const uData = {}
      uData['submit'] = 1
      uData['mobile'] = self.username
      uData['password'] = self.password

      this.$fetch({
        method: 'POST',
        name: 'modules.member',
        params: { query: '&action=login' },
        data: uData
      }).then(resData => {
          console.log(resData)
      }, error => {
          console.log(error)
      })
    }
  }
}
