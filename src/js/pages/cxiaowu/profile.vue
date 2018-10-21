<template>
  <div><text>profile{{tt}}</text></div>
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
      tt: 'ddd'
    }
  }
}
</script>
