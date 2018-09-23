import { WxcLoading } from 'weex-ui';
import Login from './login.class'

let login = null
const tabPageHeight = WXEnvironment.deviceHeight

export default {
  name: 'login',
  components: { WxcLoading },
  data () {
    return {
      loadShow: false,
      Totalheight: tabPageHeight,
      pressed: false,
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
