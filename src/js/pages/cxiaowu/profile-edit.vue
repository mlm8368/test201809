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
      <cell><bui-list-item label="学校全称" title="北京阳光雅稚幼儿园" ></bui-list-item></cell>
      <cell><bui-list-item label="学校类型" >
        <input  :value="formData.type" @input="onInput('type', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="主营行业" >
        <input  :value="formData.catid" @input="onInput('catid', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="主营范围" >
        <input  :value="formData.business" @input="onInput('business', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="成立年份" >
        <input  :value="formData.regyear" @input="onInput('regyear', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="形象图片" >
        <input  :value="formData.thumb" @input="onInput('thumb', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="经营模式" >
        <input  :value="formData.mode" @input="onInput('mode', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校规模" >
        <input  :value="formData.size" @input="onInput('size', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="注册资本" >
        <input  :value="formData.regunit" @input="onInput('regunit', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">联系方式</text>
        </div>
      </header>
      <cell><bui-list-item label="学校地址" >
        <input :value="formData.address" @input="onInput('address', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校电话" >
        <input  :value="formData.telephone" @input="onInput('telephone', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校传真" >
        <input  :value="formData.fax" @input="onInput('fax', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校邮箱" >
        <input  :value="formData.mail" @input="onInput('mail', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="学校网址" >
        <input  :value="formData.homepage" @input="onInput('homepage', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="微信公众号" >
        <input  :value="formData.gzh" @input="onInput('gzh', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="公众号二维码" >
        <input  :value="formData.gzhqr" @input="onInput('gzhqr', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div></cell>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">学校简介</text>
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
      <cell><bui-list-item label="用户名" title="sxxxs" ></bui-list-item></cell>
      <cell><bui-list-item label="手机" >
        <input  :value="formData.mobile" @input="onInput('mobile', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="邮箱" >
        <input  :value="formData.email" @input="onInput('email', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="姓名" >
        <input  :value="formData.truename" @input="onInput('truename', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="性别" >
        <input  :value="formData.gender" @input="onInput('gender', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="部门" >
        <input  :value="formData.department" @input="onInput('department', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="职位" >
        <input  :value="formData.career" @input="onInput('career', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="QQ" >
        <input  :value="formData.qq" @input="onInput('qq', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="微信" >
        <input  :value="formData.wx" @input="onInput('wx', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
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
