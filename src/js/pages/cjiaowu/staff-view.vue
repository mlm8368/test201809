<template>
  <div>
    <bui-list-item :title="teacherInfo.truename" :desc="teacherInfo.teacherpost" label="姓名">
      <image slot="action" :src="teacherInfo.avatar" class="teacherInfo-avatar"></image>
    </bui-list-item>
    <bui-list-item :title="teacherInfo.mobile" label="电话">
      <am-button size="small" type="warning" text="拨打" @click="doCall"></am-button>
    </bui-list-item>
    <bui-list-item :title="teacherInfo.gender" label="性别"></bui-list-item>
    <bui-list-item :title="teacherInfo.wx" label="微信"></bui-list-item>
    <bui-list-item :title="teacherInfo.qq" label="QQ"></bui-list-item>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.teacherInfo {

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
import StaffView from './staff-view.class'

const staff = new StaffView()

export default {
  name: 'staff-view',
  components: { BuiListItem, AmButton },
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      teacherInfo: null
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
      this.teacherInfo = teacher.outTeacher(this.teacherLists[this.index])
    },
    doCall () {
      this.$coms.call(this.teacherInfo.mobile)
    }
  }
}
</script>
