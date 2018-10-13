<template>
  <div>
    <bui-list-item label="入学时间" >
      <input :value="formData.startdate" @input="onStartdate" slot="title" class="input" placeholder="例：语文老师" />
    </bui-list-item>
    <bui-list-item label="离校毕业" >
      <input :value="formData.enddate" @input="onEnddate" slot="title" class="input" placeholder="例：语文老师" />
    </bui-list-item>
    <div class="button"><am-button width="500px" size="small" text="修改" @click="buttonClick"></am-button></div>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.input {
  height: @input-font-size + 20px;
  font-size: @input-font-size;
  tint-color: @input-tint-color;
} 
.button {
  width: 700px;
  justify-content: center;
  align-items: center;
  margin-top: @v-spacing-md;
  margin-bottom: @v-spacing-md;
}
</style>

<script>
import { mapState } from 'vuex'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import StudentEdit from './student-edit.class'

const student = new StudentEdit()

export default {
  name: 'student-edit',
  components: { BuiListItem, AmButton },
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      formData: { id: 0, startdate: '', enddate: '' }
    }
  },
  computed: {
    ...mapState(['studentLists'])
  },
  watch: {
    index: function() {
      this.setCurrentStudentData()
    }
  },
  created () {
    student.setVue(this)

    this.setCurrentStudentData()
  },
  methods: {
    setCurrentStudentData () {
      const studentInfo = this.studentLists[this.index]
      if (studentInfo) {
        this.formData.id = studentInfo.id
        this.formData.startdate = studentInfo.startdate
        this.formData.enddate = studentInfo.enddate
      }
    },
    onStartdate (e) {
      this.formData.startdate = e.value
    },
    onEnddate (e) {
      this.formData.enddate = e.value
    },
    buttonClick () {
      student.editStudent()
    }
  }
}
</script>
