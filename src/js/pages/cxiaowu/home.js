import { AmWhiteSpace, AmFlex, AmFlexItem, AmNavBar } from 'weex-amui'
import Home from './home.class'

let home = null
const dom = weex.requireModule('dom')

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
    dom.addRule('fontFace', {
      'fontFamily': 'SchoolIconFont',
      'src': 'url(\'https://at.alicdn.com/t/font_849649_01749dnnli6bi.ttf\')'
    })
  },
  created () {
    home = new Home(this)
  },
  methods: {
    changeUsername(e) {
    }
  }
}
