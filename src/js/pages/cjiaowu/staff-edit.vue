<template>
  <div>
    <bui-list-item label="职务" >
      <input :value="formData.teacherpost" @input="onTeacherpost" slot="title" class="input" placeholder="例：语文老师" />
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
import StaffEdit from './staff-edit.class'

const staff = new StaffEdit()

export default {
  name: 'staff-edit',
  components: { BuiListItem, AmButton },
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
  watch: {
    index: function() {
      this.setCurrentTeacherData()
    }
  },
  created () {
    teacher.setVue(this)

    this.setCurrentTeacherData()
  },
  methods: {
    setCurrentTeacherData () {
      const teacherInfo = this.teacherLists[this.index]
      if (teacherInfo) {
        this.formData.id = teacherInfo.id
        this.formData.teacherpost = teacherInfo.teacherpost
      }
    },
    onTeacherpost (e) {
      this.formData.teacherpost = e.value
    },
    buttonClick () {
      teacher.editTeacher()
    }
  }
}
</script>
