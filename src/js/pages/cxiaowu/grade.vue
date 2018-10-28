<template>
  <div><text>grade{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Grade from './grade.class'

const grade = new Grade()

export default {
  name: 'grade',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
