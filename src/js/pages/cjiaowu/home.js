import { AmWhiteSpace, AmWingBlank, AmFlex, AmFlexItem, AmNavBar, AmPopup, AmButton } from 'weex-amui'
import { buiSwipeCell } from 'bui-weex'
import { setFontFace } from '../../class/global'
import Home from './home.class'

let home = null

export default {
  name: 'cjiaowuHome',
  components: { AmWhiteSpace, AmWingBlank, AmFlex, AmFlexItem, AmNavBar, AmPopup, AmButton, buiSwipeCell },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      popupShow: false,
      popupPosition: 'left',
      btnAry: [
        {
          'title': '取消',
          'bgcolor': '#c6c7c8'
        },
        {
            'title': '删除',
            'bgcolor': '#fa3300'
        },
        {
            'title': '标记',
            'bgcolor': '#3399ff'
        }
    ],
    items: [
        {
            'title': '行无止尽'
        },
        {
            'title': '柠檬'
        },
        {
            'title': '樊登读书会'
        },
        {
            'title': '云应用平台'
        }
    ]
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
      if (key === 'teacher') {
        this.popupPosition = 'left'
        this.popupShow = true
      } else if (key === 'classes') {
        this.popupPosition = 'right'
        this.popupShow = true
      }
    },
    swipeLeft() {
      home.log('swipeLeft')
      return false
    }
  }
}
