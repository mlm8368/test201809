export default {
  name: 'cxiaowuIndex',
  data () {
    return {
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
      if (self.username === 'lic' && self.password === '123') {
        this.$router.open({
          name: 'index',
          type: 'OPEN'
        })
      } else {
        modal.alert({
          message: '用户名或密码错误', // 弹窗内容
          okTitle: '确定', // 确定按钮文字
          title: '' // title
        }, function () {
          // 点击按钮的回调
        })
      }
    }
  }
}
