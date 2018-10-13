<template>
  <div><text>student-view{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import StudentView from './student-view.class'

const student = new StudentView()

export default {
  name: 'student-view',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
