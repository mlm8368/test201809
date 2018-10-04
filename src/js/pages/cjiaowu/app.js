import AmNavBar from '../../components/am-nav-bar.vue'
import AmPopup from '../../components/am-popup.vue'
import Home from './home.vue'
import store from './app.store'

// import Abstract from '../../class/abstract'

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
    // const tt = new Abstract(this)
    // const schoolid = tt.getStorage(tt.appStorageKey.userid)
    this.$store.commit('init', this)
    // tt.log(this.$store.state)
  }
}
