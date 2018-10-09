<template>
  <div><text>teacher-view{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import TeacherView from './teacher-view.class'

const teacher = new TeacherView()

export default {
  name: 'teacher-view',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
