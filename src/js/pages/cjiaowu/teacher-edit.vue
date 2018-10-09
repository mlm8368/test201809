<template>
  <div><text>teacher-edit{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import TeacherEdit from './teacher-edit.class'

const teacher = new TeacherEdit()

export default {
  name: 'teacher-edit',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
