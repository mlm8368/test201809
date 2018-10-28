<template>
  <div class="school">
    <div class="school-name">
      <image class="school-name-avatar" :src="schoolInfo.thumb" :placeholder="defaultAvatar"></image>
      <text class="school-name-shortname">{{schoolInfo.passport}}</text>
    </div>
    <list>
      <header>
        <div class="school-header">
          <text class="school-header-title">身份认证</text>
        </div>
      </header>
      <cell><bui-list-item title="未认证" label="学校认证"></bui-list-item></cell>
      <cell><bui-list-item title="未认证" label="手机认证"></bui-list-item></cell>
      <cell><bui-list-item title="未认证" label="邮箱认证"></bui-list-item></cell>
      <header>
        <div class="school-header">
          <text class="school-header-title">联系方式</text>
          <text class="school-header-edit">修改资料</text>
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

    &-edit {
      color: @color-text-base-inverse;
      position: absolute;
      right: @page-padding-spacing;
      width: 150px;
      height: @list-title-height;
      line-height: @list-title-height;
      text-align: center;
    }

    &-edit:active {
      background-color: @fill-tap;
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
      schoolInfo: {}
    }
  },
  computed: {
    defaultAvatar: function() {
      return profile.getAvatar()
    },
    ...mapState(['schoolid'])
  },
  created() {
    profile.setVue(this)

    profile.getSchool((userinfo) => {
      this.schoolInfo = profile.outSchool(userinfo)
    })
  }
}
</script>
