<template>
  <div><text>profile-edit{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import ProfileEdit from './profile-edit.class'

const profile = new ProfileEdit()

export default {
  name: 'profile-edit',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
