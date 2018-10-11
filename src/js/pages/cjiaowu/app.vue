<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      ref="amnavbar"
      title="教学管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: '本校老师', key: 'teacher'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick" />
    <home class="warp" :style="{'top': homeTop}"></home>
    <am-popup
      :show.sync="popupShow"
      :position="popupPosition"
      width="500">
      <div :style="{'height': statusBarHeight}"></div>
        <text :style="{fontSize: '40px'}">popup</text>
        <am-button
          type="warning"
          @click="popupShow=false"
        ><text>点我关闭</text></am-button>
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

export default {
  name: 'cjiaowuApp',
  store,
  components: { AmNavBar, AmPopup, Home },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      popupShow: false,
      popupPosition: 'left',
      homeTop: '150px'
    }
  },
  created () {
    this.$store.commit('init', this)
  },
  mounted () {
    const dom = weex.requireModule('dom')
    dom.getComponentRect(this.$refs.amnavbar, option => {
      this.homeTop = option.size.bottom
    })
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
</script>
