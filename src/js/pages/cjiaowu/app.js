import store from './app.store'
import AmNavBar from '../../components/am-nav-bar.vue'
import AmPopup from '../../components/am-popup.vue'
import Home from './home.vue'

export default {
  name: 'cjiaowuApp',
  store,
  components: { AmNavBar, AmPopup, Home },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      popupShow: false,
      popupPosition: 'left'
    }
  },
  created () {
    this.$store.commit('init', this)
  },
  methods: {
    navbarClick(key) {
      if (key === 'teacher') {
        this.popupPosition = 'left'
        this.popupShow = true
      } else if (key === 'classes') {
        this.popupPosition = 'right'
        this.popupShow = true
      }
    }
  }
}
