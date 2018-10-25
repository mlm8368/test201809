<template>
  <scroller class="school">
    <image class="school-avatar" :src="schoolInfo.gender" :placeholder="defaultAvatar"></image>
    <text class="school-shortname">阳光美稚</text>
    <div class="school-header">
      <text class="school-header-title">联系方式</text>
      <text class="school-header-edit">编辑</text>
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
@import "../../../css/variable.less";

.school {
  width: 500px;

  &-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  &-shortname {

  }
  &-header {

    &-title {

    }

    &-edit {
      
    }
  }
}
</style>

<script>
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
    }
  },
  created() {
    profile.setVue(this)
  }
}
</script>
