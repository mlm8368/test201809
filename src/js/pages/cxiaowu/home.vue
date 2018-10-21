<template>
  <div><text>home{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Home from './home.class'

const home = new Home()

export default {
  name: 'home',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
