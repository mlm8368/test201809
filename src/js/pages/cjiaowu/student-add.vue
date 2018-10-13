<template>
  <div><text>student-add{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import StudentAdd from './student-add.class'

const student = new StudentAdd()

export default {
  name: 'student-add',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
