<template>
  <div><text>vip{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Vip from './vip.class'

const vip = new Vip()

export default {
  name: 'vip',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
