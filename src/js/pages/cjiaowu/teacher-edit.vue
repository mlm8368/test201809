<template>
  <div><text>teacher-edit{{tt}}</text></div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

</style>

<script>
import BuiListItem from '../../components/bui-list-item.vue'
import TeacherEdit from './teacher-edit.class'

const teacher = new TeacherEdit()

export default {
  name: 'teacher-edit',
  components: { BuiListItem },
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      formData: { teacherpost: '' }
    }
  },
  computed: {
    ...mapState(['teacherLists'])
  }
}
</script>
