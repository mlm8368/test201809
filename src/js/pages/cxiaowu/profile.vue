<template>
  <div class="school">
    <div class="school-name">
      <image class="school-name-avatar" :src="schoolInfo.thumb" :placeholder="defaultAvatar"></image>
      <text class="school-name-shortname">{{schoolInfo.passport}}</text>
      <div class="school-vip">
        <text class="school-vip-label">普通会员</text>
        <text class="school-vip-value school-vip-link" @click="goPage('grade')">升级为VIP</text>
      </div>
      <div class="school-vip">
        <text class="school-vip-label">VIP会员</text>
        <text class="school-vip-value">第 1 年</text>
      </div>
      <div class="school-edit">
        <text class="school-edit-label" @click="goPage('profile-edit')">修改资料</text>
        <text class="school-edit-value" @click="goPage('password-edit')">修改密码</text>
      </div>
    </div>
    <list>
      <header>
        <div class="school-header">
          <text class="school-header-title">身份认证</text>
        </div>
      </header>
      <cell><bui-list-item label="学校认证">
        <text slot="title" class="school-validate" @click="goPage('validate', 'school')">未认证</text>
      </bui-list-item></cell>
      <cell><bui-list-item label="手机认证">
        <text slot="title" class="school-validate" @click="goPage('validate', 'mobile')">未认证</text>
      </bui-list-item></cell>
      <cell><bui-list-item label="邮箱认证">
        <text slot="title" class="school-validate" @click="goPage('validate', 'email')">未认证</text>
      </bui-list-item></cell>
      <header>
        <div class="school-header">
          <text class="school-header-title">联系方式</text>
        </div>
      </header>
      <cell><bui-list-item :title="schoolInfo.company" label="学校全称"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.address" label="学校地址"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.postcode" label="邮政编码"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.telephone" label="学校电话"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.mail" label="电子邮箱"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.homepage" label="学校网站"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.gzh" label="微信公众号"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.gzhqr" label="二维码"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.truename" label="管理员"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.mobile" label="手机号码"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.qq" label="QQ"></bui-list-item></cell>
      <cell><bui-list-item :title="schoolInfo.wx" label="微信"></bui-list-item></cell>
    </list>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.school {
  width: 500px;
  height: 1160px;

  &-name {
    width: 500px;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;

    &-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border-width: @border-width-sm;
      border-style: solid;
      border-color: @border-color-base;
    }
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
  
  &-vip {
    &-link:active {
      background-color: @fill-tap;
    }
  }
  &-edit {
    &-label:active {
      background-color: @fill-tap;
    }
    &-value:active {
      background-color: @fill-tap;
    }
  }

  &-header {
    flex-direction: row;
    align-items: center;
    background-color: @brand-primary;

    &-title {
      height: @list-title-height;
      line-height: @list-title-height;
      padding-left: @page-padding-spacing;
      color: @color-text-base-inverse;
    }

  }

  &-validate:active {
    background-color: @fill-tap;
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
      schoolInfo: {}
    }
  },
  computed: {
    defaultAvatar: function() {
      return profile.getAvatar()
    },
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
      if (param) apppage.params = { vkind: param }
      this.$store.commit('setAppPage', apppage)
      this.$emit('closePopup')
    }
  }
}
</script>
