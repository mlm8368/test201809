<template>
  <div class="password">
    <text class="password-info page-left-padded">密码修改后需重新登录。</text>
    <scroller>
      <header>
        <div class="header">
          <text class="header-cell page-left-padded">设置新密码</text>
        </div>
      </header>
      <bui-list-item label="现有密码" >
        <input :value="formData.password" @input="onInput('password', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item>
      <bui-list-item label="新登录密码" >
        <input  :value="formData.newpassword" @input="onInput('newpassword', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item>
      <bui-list-item label="重复新密码" >
        <input  :value="formData.newpassword1" @input="onInput('newpassword1', $event)" slot="title" class="input" type="password" placeholder="需6位以上" />
      </bui-list-item>
      <div class="password-button"><am-button width="500px" size="small" text="确认修改" @click="buttonClick"></am-button></div>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

.password {
  &-info {
    height: 60px;
    line-height: 60px;
  }
  &-button {
    width: 700px;
    justify-content: center;
    align-items: center;
    margin-top: @v-spacing-md;
    margin-bottom: @v-spacing-md;
  }
}

</style>

<script>
import FormMixins from '../../class/form.mixins'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import PasswordEdit from './password-edit.class'

const password = new PasswordEdit()

export default {
  name: 'password-edit',
  components: { BuiListItem, AmButton },
  mixins: [FormMixins],
  data () {
    return {
      formData: {password: '', newpassword: '', newpassword1: ''}
    }
  },
  created() {
    password.setVue(this)
  },
  methods: {
    buttonClick () {
      password.log(this.formData)
    }
  }
}
</script>
