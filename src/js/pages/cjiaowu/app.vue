<template>
  <div class="wrapper">
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      ref="amnavbar"
      title="教学管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: '本校老师', key: 'staff'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick"></am-nav-bar>
    <home class="pagewarp"></home>
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
.wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #cccccc;
  }
.pagewarp {
 flex:1;
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
      pageReload: false
    }
  },
  computed: {
    currentPopupComponent: function () {
      return `popup-${this.popup.type}`
    }
  },
  created () {
    this.$store.commit('init', this)
    this.bindEvent()
  },
  eros: {
	beforeBackAppear (params, options) {
		console.log('cjiaowu beforeBackAppear ')
		if(this.pageReload === true){
			this.pageReload = false
			this.$router.refresh()
		}
	}
  },
  methods: {
    bindEvent() {
		this.$event.on('login.update', resData => {
			this.pageReload = true
			console.log('cjiaowu login.update ', resData)
		})
    },
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
