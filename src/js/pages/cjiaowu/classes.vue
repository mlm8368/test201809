<template>
  <div><text>classes{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Classes from './classes.class'

const classes = new Classes()

export default {
  name: 'classes',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
