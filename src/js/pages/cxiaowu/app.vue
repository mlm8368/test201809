<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      ref="amnavbar"
      title="学校管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "['profile']"
      :right-btn="['home', {is: 'text', text: '发布', key: 'publish'}]"
      @click="navbarClick" />
    <div class="warp" :style="{'top': homeTop}">
      <keep-alive>
        <component :is="currentPageComponent"></component>
      </keep-alive>
    </div>
    <am-popup
      :show.sync="popup.show"
      :position="popup.position"
      width="500">
      <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
      <keep-alive>
        <component :is="currentPopupComponent" :nav-bar-bg-color="navBarBgColor" @closePopup="popup.show = false"></component>
      </keep-alive>
    </am-popup>
    <bmmask class="bmmask" animation="scale" position="center" duration="300" disableMaskEvent="true" ref="bmmask">
      <bmpop :style="{'width': dialog.width, 'height': dialog.height}" class="bmpop">
        <div class="dialog-header">
          <text class="dialog-header-title">{{dialog.title}}</text>
          <am-icon
            @click="closeDialog"
            class="dialog-header-close"
            type="close"
            size="sm" />
        </div>
        <div class="dialog-body">
          <keep-alive>
            <component :is="currentDialogComponent" :index="dialog.index"></component>
          </keep-alive>
        </div>
      </bmpop>
    </bmmask>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/dialog.less";

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
import AmIcon from '../../components/am-icon.vue'
import AmNavBar from '../../components/am-nav-bar.vue'
import AmPopup from '../../components/am-popup.vue'
import Home from './home.vue'
import Profile from './profile.vue'
import Publish from './publish.vue'

export default {
  name: 'cxiaowuApp',
  components: { 
    AmIcon, AmNavBar, AmPopup,
    'page-home': function (resolve) { resolve(Home) },
    'popup-profile': function (resolve) { resolve(Profile) },
    'popup-publish': function (resolve) { resolve(Publish) }
  },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      page: { type: 'home' },
      dialog: { width: '700px', height: '800px', title: '窗口', type: 'teacher', op: 'view', index: 0 },
      popup: { show: false, position: 'right', type: 'profile' },
      homeTop: 150
    }
  },
  computed: {
    currentPageComponent: function() {
      return `page-${this.page.type}`
    },
    currentDialogComponent: function () {
      return `dialog-${this.dialog.type}-${this.dialog.op}`
    },
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
    
    //this.navbarClick('publish') // test
    //this.openDialog('student', 'add') // test
  },
  methods: {
    navbarClick(key) {
      if (key === 'profile') {
        this.popup.type = 'profile'
        this.popup.position = 'left'
        this.popup.show = true
      } else if (key === 'publish') {
        this.popup.type = 'publish'
        this.popup.position = 'right'
        this.popup.show = true
      } else if (key === 'home') {
        this.page.type = 'home'
      }
    },
    openDialog(type = 'teacher', op = 'add', index = 0) {
      const dialog = { width: '700px', height: '800px', title: '窗口', type: type, op: op, index: index }
      switch (type) {
        case 'teacher':
          if (op === 'add') {
            dialog.title = '添加老师'
          } else if (op === 'edit') {
            const teacherInfo = this.teacherLists[index]
            dialog.height = '280px'
            dialog.title = `编辑 ${teacherInfo.truename} 老师信息`
          } else if (op === 'view') {
            dialog.height = '560px'
            dialog.title = '查看老师信息'
          }
          break;

        case 'student':
          if (op === 'add') {
            dialog.title = '添加学生'
          } else if (op === 'edit') {
            const studentInfo = this.studentLists[index]
            dialog.height = '380px'
            dialog.title = `编辑 ${studentInfo.babyname} 学生信息`
          } else if (op === 'view') {
            dialog.title = '查看学生信息'
          }
          break;

        case 'staff':
          if (op === 'edit') {
            const staffInfo = this.staffLists[index]
            dialog.height = '380px'
            dialog.title = `编辑 ${staffInfo.truename} 老师信息`
          } else if (op === 'view') {
            dialog.title = '查看老师信息'
          }
          break;
      }

      this.dialog = dialog
      const bmmaskDom = this.$refs.bmmask
      bmmaskDom.show()
    },
    closeDialog() {
      const bmmaskDom = this.$refs.bmmask
      bmmaskDom.hide()
    }
  }
}
</script>
