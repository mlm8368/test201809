<template>
  <div class="wrapper">
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      ref="amnavbar"
      title="学校管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "['profile']"
      :right-btn="['home', {is: 'text', text: '发布', key: 'publish'}]"
      @click="navbarClick"></am-nav-bar>
    <div class="pagewarp">
      <keep-alive>
        <component :is="currentPageComponent" :params="page.params"></component>
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
import { mapState } from 'vuex'
import AmIcon from '../../components/am-icon.vue'
import AmNavBar from '../../components/am-nav-bar.vue'
import AmPopup from '../../components/am-popup.vue'
import Profile from './profile.vue'
import Publish from './publish.vue'
import Home from './home.vue'
import Grade from './grade.vue'
import ProfileEdit from './profile-edit.vue'
import PasswordEdit from './password-edit.vue'
import Validate from './validate.vue'
import Banner from './banner.vue'

export default {
  name: 'cxiaowuApp',
  store,
  components: { 
    AmIcon, AmNavBar, AmPopup,
    'popup-profile': function (resolve) { resolve(Profile) },
    'popup-publish': function (resolve) { resolve(Publish) },
    'page-home': function (resolve) { resolve(Home) },
    'page-grade': function (resolve) { resolve(Grade) },
    'page-profile-edit': function (resolve) { resolve(ProfileEdit) },
    'page-password-edit': function (resolve) { resolve(PasswordEdit) },
    'page-validate': function (resolve) { resolve(Validate) },
    'page-banner': function (resolve) { resolve(Banner) }
  },
  data () {
    return {
      statusBarHeight: weex.config.eros.statusBarHeight,
      navBarBgColor: '#108ee9',
      page: { type: 'home', params: null },
      dialog: { width: '700px', height: '800px', title: '窗口', type: 'teacher', op: 'view', index: 0 },
      popup: { show: false, position: 'right', type: 'profile' },
      pageReload: false
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
    },
    ...mapState(['apppage', 'appdialog'])
  },
  watch: {
    apppage: function(apppage) {
      this.page = apppage
    },
    appdialog: function(appdialog) {
      if (appdialog.action === 'open') this.openDialog(appdialog.type, appdialog.op, appdialog.index)
      else if (appdialog.action === 'close') this.closeDialog()
    }
  },
  created () {
    this.$store.commit('init', this)
    this.bindEvent()
  },
  mounted () {
    //this.navbarClick('profile') // test
    //this.openDialog('student', 'add') // test
    //this.page.type = 'password-edit'
  },
  eros: {
	beforeBackAppear (params, options) {
		//console.log('cxiaowu beforeBackAppear ')
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
			//console.log('cxiaowu login.update ', resData)
		})
    },
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
