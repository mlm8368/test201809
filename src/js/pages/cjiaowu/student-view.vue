<template>
  <scroller class="studentInfo">
    <bui-list-item :title="studentInfo.babyname" label="姓名">
      <image slot="action" :src="studentInfo.avatar" class="studentInfo-avatar"></image>
    </bui-list-item>
    <bui-list-item v-for="(one, index) in studentInfo.parents" :key="index" :title="one.truename" :label="one.call">
      <am-button size="small" type="warning" :text="`拨打：${one.mobile}`" @click="doCall(one.mobile)"></am-button>
    </bui-list-item>
    <bui-list-item :title="studentInfo.gender" label="性别"></bui-list-item>
    <bui-list-item :title="studentInfo.birthday" label="生日"></bui-list-item>
    <bui-list-item :title="studentInfo.startdate" label="入学时间"></bui-list-item>
    <bui-list-item :title="studentInfo.enddate" label="离校毕业"></bui-list-item>
  </scroller>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.studentInfo {
  width: 700px;
  height: 725px;
  flex-direction: column;
  align-items: flex-start;

  &-avatar {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border-width: 1px;
    border-style: solid;
    border-color: @border-color-base;
  }
}
</style>

<script>
import '../../../../node_modules/eros-widget/src/coms.js'
import { mapState } from 'vuex'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import StudentView from './student-view.class'

const student = new StudentView()

export default {
  name: 'student-view',
  components: { BuiListItem, AmButton },
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      studentInfo: null
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
      this.studentInfo = student.outStudent(this.studentLists[this.index])
    },
    doCall (mobile) {
      this.$coms.call(mobile)
    }
  }
}
</script>
