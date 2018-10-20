<template>
  <div>
    <bui-list-item :title="staffInfo.truename" label="姓名">
      <image slot="action" :src="staffInfo.avatar" class="staffInfo-avatar"></image>
    </bui-list-item>
    <bui-list-item :title="staffInfo.mobile" label="电话">
      <am-button size="small" type="warning" text="拨打" @click="doCall"></am-button>
    </bui-list-item>
    <bui-list-item :title="staffInfo.gender" label="性别"></bui-list-item>
    <bui-list-item :title="staffInfo.wx" label="微信"></bui-list-item>
    <bui-list-item :title="staffInfo.qq" label="QQ"></bui-list-item>
    <bui-list-item :title="staffInfo.agree" label="状态"></bui-list-item>
    <bui-list-item :title="staffInfo.jointime" label="入职时间"></bui-list-item>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.staffInfo {

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
      staffInfo: null
    }
  },
  computed: {
    ...mapState(['staffLists'])
  },
  watch: {
    index: function() {
      this.setCurrentStaffData()
    }
  },
  created () {
    staff.setVue(this)

    this.setCurrentStaffData()
  },
  methods: {
    setCurrentStaffData () {
      this.staffInfo = staff.outStaff(this.staffLists[this.index])
    },
    doCall () {
      this.$coms.call(this.staffInfo.mobile)
    }
  }
}
</script>
