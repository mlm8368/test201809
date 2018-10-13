<template>
  <div><text>student-edit{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import StudentEdit from './student-edit.class'

const student = new StudentEdit()

export default {
  name: 'student-edit',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
