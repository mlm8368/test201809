<template>
  <scroller>
    <image class="" :src="" :placeholder="defaultAvatar"></image>
    <div>阳光美稚</div>
    <div class="banji-list-header">
        <text class="banji-list-header-teacher">联系方式</text>
        <am-icon @click="getTeacherLists('refresh')" class="banji-list-header-reload" type="reload" size="sm" />
        <am-icon @click="openDialog('teacher')" class="banji-list-header-plus" type="plus" size="sm" />
      </div>
    <bui-list-item :title="schoolInfo.gender" label="学校全称"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="学校地址"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="邮政编码"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="学校电话"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="电子邮箱"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="学校网站"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="微信公众号"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="二维码"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="管理员"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="部门职务"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="手机号码"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="QQ"></bui-list-item>
    <bui-list-item :title="schoolInfo.gender" label="微信"></bui-list-item>
  </scroller>
</template>

<style lang="less" scoped>

</style>

<script>
import Profile from './profile.class'

const profile = new Profile()

export default {
  name: 'profile',
  data () {
    return {
      schoolInfo: {}
    }
  },
  computed: {
    defaultAvatar: function() {
      return profile.getAvatar()
    }
  },
  created() {
    profile.setVue(this)
  }
}
</script>
