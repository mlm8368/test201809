<template>
  <div><text>password-edit{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import PasswordEdit from './password-edit.class'

const password = new PasswordEdit()

export default {
  name: 'password-edit',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
