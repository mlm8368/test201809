import { WxcLoading } from 'weex-ui';
import Login from './login.class'

let login = null

export default {
  name: 'userLogin',
  components: { WxcLoading },
  data () {
    return {
      loadShow: false,
      pageHeight: weex.config.env.deviceHeight,
      mobile: '18600360004',
      password: '147258'
    }
  },
  created () {
    login = new Login(this)
  },
  methods: {
    submit() {
      login.doLogin()
    }
  }
}
