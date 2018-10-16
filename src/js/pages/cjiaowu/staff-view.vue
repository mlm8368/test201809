<template>
  <div><text>staff-view{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import StaffView from './staff-view.class'

const staff = new StaffView()

export default {
  name: 'staff-view',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
