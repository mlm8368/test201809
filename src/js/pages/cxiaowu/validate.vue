<template>
  <div><text>validate{{tt}}</text></div>
</template>

<style lang="less" scoped>

</style>

<script>
import Validate from './validate.class'

const validate = new Validate()

export default {
  name: 'validate',
  data () {
    return {
      tt: 'ddd'
    }
  }
}
</script>
