<template>
  <div class="school">
    <div class="school-name">
      <image class="avatar" :src="schoolInfo.thumb"></image>
      <text class="school-name-shortname">{{schoolInfo.passport}}</text>
      <div v-if="schoolInfo.vip && schoolInfo.havedays" class="school-vip">
        <text class="school-vip-label">VIP会员</text>
        <text class="school-vip-value link" @click="goPage('grade')">第 {{schoolInfo.vipyear}} 年</text>
      </div>
      <div v-else class="school-vip">
        <text class="school-vip-label">普通会员</text>
        <text class="school-vip-value link" @click="goPage('grade')">升级为VIP</text>
      </div>
      <div class="school-edit">
        <text class="school-edit-label link" @click="goPage('profile-edit')">修改资料</text>
        <text class="school-edit-value link" @click="goPage('password-edit')">修改密码</text>
      </div>
    </div>
    <list>
      <template v-if="schoolInfo.vip && schoolInfo.havedays">
      <header>
        <div class="school-header header">
          <text class="school-header-title header-cell">VIP信息</text>
          <text class="school-header-edit header-cell right link" @click="goPage('grade')">我要续费</text>
        </div>
      </header>
      <cell><bui-list-item label="VIP级别">
        <image slot="title" src="bmlocal://assets/bos/forkme_right_gray_6d6d6d.png" width="30" height="10"></image>
      </bui-list-item></cell>
      <cell><bui-list-item label="服务开始" :title="schoolInfo.fromtime"></bui-list-item></cell>
      <cell><bui-list-item label="服务结束" :title="schoolInfo.totime"></bui-list-item></cell>
      <cell><bui-list-item label="剩余天数" :title="schoolInfo.havedays"></bui-list-item></cell>
      </template>
      <header>
        <div class="school-header header">
          <text class="school-header-title header-cell">身份认证</text>
        </div>
      </header>
      <cell><bui-list-item label="学校认证">
        <text slot="title" class="link" @click="goPage('validate', 'company')">去认证</text>
      </bui-list-item></cell>
      <cell><bui-list-item label="个人认证">
        <text slot="title" class="link" @click="goPage('validate', 'truename')">去认证</text>
      </bui-list-item></cell>
      <header>
        <div class="school-header header">
          <text class="school-header-title header-cell">联系方式</text>
        </div>
      </header>
      <cell><bui-list-item :title="schoolInfo.company" label="学校全称"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.address" label="学校地址"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.telephone" label="学校电话"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.mail" label="电子邮箱"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.homepage" label="学校网站"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.gzh" label="微信公众号"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.truename" label="管理员"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.mobile" label="手机号码"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.qq" label="QQ"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.wx" label="微信"></bui-list-item></cell>
    </list>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

.school {
  width: 500px;
  height: 1160px;

  &-name {
    width: 500px;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;

    &-shortname {
      margin-top: @v-spacing-xs;
    }
  }

  &-vip,&-edit {
    width: 500px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: @v-spacing-xs;

    &-label {
      flex: 1;
      padding-left: @h-spacing-md;
      padding-right: @h-spacing-sm;
      border-right-width: @border-width-lg;
      border-right-style: solid;
      border-right-color: @border-color-base;
      text-align: right;
    }
    &-value {
      flex: 1;
      padding-left: @h-spacing-sm;
      padding-right: @h-spacing-md;
    }
  }

  &-header {

    &-title {
      padding-left: @page-padding-spacing;
    }
    
    &-edit {
      width: 150px;
      text-align: center;
    }

  }
}
</style>

<script>
import { mapState } from 'vuex'
import BuiListItem from '../../components/bui-list-item.vue'
import Profile from './profile.class'

const profile = new Profile()

export default {
  name: 'profile',
  components: { BuiListItem },
  data () {
    return {
      schoolInfo: {
		vip: 1,
		havedays: 1,
		thumb: profile.getAvatar()
	  }
    }
  },
  computed: {
    ...mapState(['schoolid', 'profileStatus'])
  },
  created() {
    profile.setVue(this)

    profile.getSchool((userinfo) => {
      this.schoolInfo = profile.outSchool(userinfo)
    })
  },
  watch: {
    profileStatus: function() {
      profile.getSchool((userinfo) => {
        this.schoolInfo = profile.outSchool(userinfo)
      })
    }
  },
  methods: {
    goPage(type, param) {
      const apppage = { type: type, params: null }
      if (param) apppage.params = param
      this.$store.commit('setAppPage', apppage)
      this.$emit('closePopup')
    }
  }
}
</script>
