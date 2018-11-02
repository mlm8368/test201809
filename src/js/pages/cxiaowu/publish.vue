<template>
  <div class="publish">
    
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";
@import "../../../css/common.less";

</style>

<script>
import BuiListItem from '../../components/bui-list-item.vue'
import Publish from './publish.class'

const publish = new Publish()

export default {
  name: 'publish',
  components: { BuiListItem },
  data () {
    return {
      tt: 'ddd'
    }
  },
  created() {
    publish.setVue(this)
  },
  methods: {
    buttonClick () {
      publish.log(this.formData)
    }
  }
}
</script>
