import { mapState } from 'vuex'
import Home from './home.class'

const home = new Home()

export default {
  name: 'cxiaowuHome',
  components: { AmNavBar, AmPopup, AmButton },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      popupShow: false,
      popupPosition: 'left'
    }
  },
  beforeCreate () {
    setFontFace()
  },
  created () {
    home = new Home(this)
  },
  methods: {
    navbarClick(key) {
      // home.log(key)
      if (key === 'profile') {
        this.popupPosition = 'left'
        this.popupShow = true
      } else if (key === 'publish') {
        this.popupPosition = 'right'
        this.popupShow = true
      }
    }
  }
}
