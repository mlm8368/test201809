import { AmWhiteSpace, AmFlex, AmFlexItem, AmNavBar } from 'weex-amui'
import Home from './home.class'

let home = null

export default {
  name: 'cxiaowuHome',
  components: { AmWhiteSpace, AmFlex, AmFlexItem, AmNavBar },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarHeight: Number.parseInt(weex.config.eros.navBarHeight) + Number.parseInt(weex.config.eros.statusBarHeight)
    }
  },
  beforeCreate () {
    home.setFontFace()
  },
  created () {
    home = new Home(this)
  },
  methods: {
    navbarClick(key) {
      home.log(key)
    }
  }
}
