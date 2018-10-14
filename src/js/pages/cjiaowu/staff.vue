<template>
  <div><text>staff{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Staff from './staff.class'

const staff = new Staff()

export default {
  name: 'staff',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
