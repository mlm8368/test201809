<template>
  <div>
    <bui-list-item label="教师职务" >
      <input :value="formData.teacherpost" @input="onTeacherpost" slot="title" class="input" placeholder="请输入公司名称" />
    </bui-list-item>
    <div class="teacherInfo-button"><am-button width="500px" size="small" text="添加" @click="buttonClick"></am-button></div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

</style>

<script>
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import TeacherEdit from './teacher-edit.class'

const teacher = new TeacherEdit()

export default {
  name: 'teacher-edit',
  components: { BuiListItem，AmButton },
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      formData: { id: 0, teacherpost: '' }
    }
  },
  computed: {
    ...mapState(['teacherLists'])
  },
  created () {
    teacher.setVue(this)
  
    const teacherInfo = this.teacherLists[this.index]
    if (teacherInfo > 0) {
       this.formData.id = teacherInfo.id
       this.formData.teacherpost = teacherInfo.teacherpost
    }
  },
  methods: {
    onTeacherpost (e) {
      this.formData.teacherpost = e.value
    },
    buttonClick () {
      teacher.editTeacher()
    }
  }
}
</script>
