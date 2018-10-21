<template>
  <div><text>publish{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Publish from './publish.class'

const publish = new Publish()

export default {
  name: 'publish',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
