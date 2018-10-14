<template>
  <div>
    <am-nav-bar 
      ref="amnavbar"
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[]"
      :right-btn="[]">
      <text slot="title">tou</text>
      </am-nav-bar>
    <div class="form-header">
      <text class="form-header-title">本校共 {{total}} 位教师</text>
      <am-icon @click="getTeacherLists('refresh')" class="form-header-reload" type="reload" size="sm" />
      <am-icon @click="openDialog('teacher')" class="form-header-plus" type="plus" size="sm" />
    </div>
    <scroller class="list">
      <div v-if="staffListsLoading" class="banji-list-loading"><wxc-part-loading show="true"></wxc-part-loading></div>
      <bui-list-item v-for="(one, index) in lists" :key="index" :title="one.truename" :active-bg="true" @cellClick="chooseClasses(index)">
        <wxc-rich-text-tag v-if="classesid === one.id" slot="label" tag-value="当前" tag-theme="blue"></wxc-rich-text-tag>
        <am-button size="small" type="warning" text="编辑" @click="editIndex = index"></am-button>
      </bui-list-item>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

</style>

<script>
import { mapState } from 'vuex'
import AmIcon from '../../components/am-icon.vue'
import AmNavBar from '../../components/am-nav-bar.vue'
import BuiListItem from '../../components/bui-list-item.vue'
import AmButton from '../../components/am-button.vue'
import WxcPartLoading from '../../components/wxc-part-loading.vue'
import Staff from './staff.class'

const staff = new Staff()

export default {
  name: 'staff',
  components: { AmIcon, AmNavBar, BuiListItem, AmButton, WxcPartLoading },
  props: {
    navBarBgColor: {
      type: String,
      default: '#108ee9'
    }
  },
  data () {
    return {
      editStaff: false,
      lists: [],
      staffListsLoading: false,
      searchStaff: null,
      searchMsg: ''
    }
  },
  computed: {
    total: function() {
      return this.lists.length
    },
    ...mapState(['schoolid'])
  },
  created () {
    staff.setVue(this)

    if (this.schoolid) {
      this.staffListsLoading = true
      staff.getStaffLists((lists) => {
        this.staffListsLoading = false
        this.lists = staff.outStaff(lists)
      })
    }
  }
}
</script>
