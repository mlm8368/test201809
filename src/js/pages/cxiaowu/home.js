import { AmWhiteSpace, AmWingBlank, AmFlex, AmFlexItem, AmNavBar, AmPopup, AmButton } from 'weex-amui'
import { setFontFace } from '../../class/global'
import Home from './home.class'

let home = null

export default {
  name: 'cxiaowuHome',
  components: { AmWhiteSpace, AmWingBlank, AmFlex, AmFlexItem, AmNavBar, AmPopup, AmButton },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarHeight: Number.parseInt(weex.config.eros.navBarHeight) + Number.parseInt(weex.config.eros.statusBarHeight),
      popupHeight: Number.parseInt(weex.config.env.deviceHeight) - 500,
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
