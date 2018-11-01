<template>
  <div>
    <image class="avatar"></image>
    <text>阳光美稚</text>
    <list>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">学校资料</text>
        </div>
      </header>
      <cell><bui-list-item label="现有密码" >
        <input :value="formData.password" @input="onInput('password', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="新登录密码" >
        <input  :value="formData.newpassword" @input="onInput('newpassword', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="重复新密码" >
        <input  :value="formData.newpassword1" @input="onInput('newpassword1', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">联系方式</text>
        </div>
      </header>
      <cell><bui-list-item label="现有密码" >
        <input :value="formData.password" @input="onInput('password', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="新登录密码" >
        <input  :value="formData.newpassword" @input="onInput('newpassword', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="重复新密码" >
        <input  :value="formData.newpassword1" @input="onInput('newpassword1', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">学校资料</text>
        </div>
      </header>
      <cell><bui-list-item label="现有密码" >
        <input :value="formData.password" @input="onInput('password', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="新登录密码" >
        <input  :value="formData.newpassword" @input="onInput('newpassword', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="重复新密码" >
        <input  :value="formData.newpassword1" @input="onInput('newpassword1', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
        <header>
        <div class="header">
          <text class="header-cell page-left-padded">管理员</text>
        </div>
      </header>
      <cell><bui-list-item label="现有密码" >
        <input :value="formData.password" @input="onInput('password', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="新登录密码" >
        <input  :value="formData.newpassword" @input="onInput('newpassword', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="重复新密码" >
        <input  :value="formData.newpassword1" @input="onInput('newpassword1', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
    </list>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

</style>

<script>
import { mapState } from 'vuex'
import FormMixins from '../../class/form.mixins'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import ProfileEdit from './profile-edit.class'

const profile = new ProfileEdit()

export default {
  name: 'profile-edit',
  components: { BuiListItem, AmButton },
  mixins: [FormMixins],
  computed: {
    defaultAvatar: function() {
      return password.getAvatar()
    },
    ...mapState(['schoolid'])
  },
  data () {
    return {
      formData: {password: '', newpassword: '', newpassword1: ''}
    }
  },
  created() {
    profile.setVue(this)
  },
  methods: {
    buttonClick () {
      profile.log(this.formData)
    }
  }
}
</script>
