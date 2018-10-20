<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      ref="amnavbar"
      title="教学管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: '本校老师', key: 'staff'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick"></am-nav-bar>
    <home class="warp" :style="{'top': homeTop}"></home>
    <am-popup
      :show.sync="popup.show"
      :position="popup.position"
      width="500">
      <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
      <keep-alive>
        <component :is="currentPopupComponent" :nav-bar-bg-color="navBarBgColor" @closePopup="popup.show = false"></component>
      </keep-alive>
    </am-popup>
  </div>
</template>

<style lang="less" scoped>
.warp {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
}
</style>

<script>
import store from './app.store'
import AmNavBar from '../../components/am-nav-bar.vue'
import AmPopup from '../../components/am-popup.vue'
import Home from './home.vue'
import Classes from './classes.vue'
import Staff from './staff.vue'

export default {
  name: 'cjiaowuApp',
  store,
  components: { 
    AmNavBar, AmPopup, Home,
    'popup-classes': function (resolve) { resolve(Classes) },
    'popup-staff': function (resolve) { resolve(Staff) }
  },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      popup: { show: false, position: 'right', type: 'classes' },
      homeTop: 150
    }
  },
  computed: {
    currentPopupComponent: function () {
      return `popup-${this.popup.type}`
    }
  },
  created () {
    this.$store.commit('init', this)
  },
  mounted () {
    this.$nextTick(function () {
      const dom = weex.requireModule('dom')
      dom.getComponentRect(this.$refs.amnavbar, option => {
        this.homeTop = option.size.bottom
      })
    })
    
    this.navbarClick('staff') // test
  },
  methods: {
    navbarClick(key) {
      this.popup.type = key
      if (key === 'staff') {
        this.popup.position = 'left'
        this.popup.show = true
      } else if (key === 'classes') {
        this.popup.position = 'right'
        this.popup.show = true
      }
    }
  }
}
</script>
