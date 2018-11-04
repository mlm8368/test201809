<template>
  <div class="profile">
    <image class="avatar"></image>
    <text>阳光美稚</text>
    <list>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">学校资料</text>
        </div>
      </header>
      <cell><bui-list-item label="学校全称" title="北京阳光雅稚幼儿园" ></bui-list-item></cell>
      <cell><bui-list-item label="学校类型">
        <div slot="title" @click="showPicker('type', '学校类型')">
          <text v-if="formData.type">{{formData.type}}</text>
          <text v-else>请选择</text>
        </div>
      </bui-list-item></cell>
      <cell><bui-list-item label="主营行业" >
        <div slot="title" @click="showPicker('catid', '主营行业')">
          <text v-if="formData.catid">{{catname}}</text>
          <text v-else>请选择</text>
        </div>
      </bui-list-item></cell>
      <cell><bui-list-item label="主营范围" >
        <input  :value="formData.business" @input="onInput('business', $event)" slot="title" class="input" type="text" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="成立年份" >
        <input  :value="formData.regyear" @input="onInput('regyear', $event)" slot="title" class="input" type="number" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="形象图片" >
        <input  :value="formData.thumb" @input="onInput('thumb', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item></cell>
      <cell><bui-list-item label="经营模式" >
        <bui-checkbox slot="title" v-model="formData.mode" :items="modeItems" @change="onModeChange"></bui-checkbox>
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
    <am-picker
      :show.sync="picker.show"
      :title="picker.title"
      :data="picker.data"
      v-model="picker.value"
      @ok="onPickerOK"></am-picker>
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
import AmPicker from '../../components/am-picker.vue'
import BuiCheckbox from '../../components/bui-checkbox.vue'
import AmButton from '../../components/am-button.vue'
import { PickerData } from './profile-edit.config'
import ProfileEdit from './profile-edit.class'

const tool = weex.requireModule('bmTool')

const profile = new ProfileEdit()

export default {
  name: 'profile-edit',
  components: { BuiListItem, AmPicker, BuiCheckbox, AmButton },
  mixins: [FormMixins],
  data () {
    return {
      formData: {
        type: '', 
        catid: 0, 
        business: '',
        mode: '2'
      },
      picker: {
        key: '',
        show: false,
        title: '请选择',
        data: [],
        value: []
      },
      catname: ''
    }
  },
  computed: {
    defaultAvatar: function() {
      return password.getAvatar()
    },
    modeItems: function() {
      return PickerData.mode
    },
    ...mapState(['schoolid'])
  },
  created() {
    profile.setVue(this)
  },
  methods: {
    buttonClick () {
      profile.log(this.formData)
    },
    showPicker (key, title) {
      this.picker.key = key
      this.picker.title = title
      this.picker.data = PickerData[key]
      this.picker.value = []
      if (this.formData[key]) this.picker.value.push(this.formData[key])
      this.picker.show = true

      tool.resignKeyboard()
    },
    onPickerOK (values, labels) {
      this.formData[this.picker.key] = values[0]
      if (this.picker.key === 'catid') this.catname = labels[0]
    },
    onModeChange (value, item) {
      profile.log(value)
      profile.log(item)
    }
  }
}
</script>
