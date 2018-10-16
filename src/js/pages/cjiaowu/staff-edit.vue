<template>
  <div><text>staff-view{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import StaffEdit from './staff-edit.class'

const staff = new StaffEdit()

export default {
  name: 'staff-edit',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
