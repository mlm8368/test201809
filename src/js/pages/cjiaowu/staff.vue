<template>
  <div>
    <am-nav-bar 
      ref="amnavbar"
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[]"
      :right-btn="[]">
        <bui-searchbar-left class="searchbox" :background-color="navBarBgColor" search-text-color="#FFFFFF" input-type="tel" slot="title" @search="onSearch" placeholder="请输入老师手机号查找"></bui-searchbar-left>
    </am-nav-bar>
    <text v-if="searchMsg" class="searchMsg">{{searchMsg}}</text>
    <bui-list-item v-if="searchStaff" :title="searchStaff.truename">
      <image slot="label" :src="searchStaff.avatar" class="list-avatar"></image>
      <am-button size="small" type="warning" text="添加" @click="addStaff"></am-button>
    </bui-list-item>
    <list class="list">
      <template v-if="totalToAgree > 0">
        <header class="list-header">
          <text class="list-header-title">待老师确认</text>
          <am-icon @click="getStaffLists('refresh')" class="list-header-reload" type="reload" size="sm" />
        </header>
        <cell v-for="(one, index) in lists" :key="index" v-if="one.agree === 0">
          <bui-list-item :title="one.truename" :active-bg="true" @cellClick="openDialog(index, 'view')">
            <image slot="label" :src="one.avatar" class="list-avatar"></image>
            <am-button size="small" type="warning" text="删除" @click="delStaff(index)"></am-button>
          </bui-list-item>
        </cell>
      </template>
      <template v-if="totalNotAgree > 0">
        <header class="list-header">
          <text class="list-header-title">老师已拒绝</text>
          <am-icon @click="getStaffLists('refresh')" class="list-header-reload" type="reload" size="sm" />
        </header>
        <cell v-for="(one, index) in lists" :key="index" v-if="one.agree === -1">
          <bui-list-item :title="one.truename" :active-bg="true" @cellClick="openDialog(index, 'view')">
            <image slot="label" :src="one.avatar" class="list-avatar"></image>
            <am-button size="small" type="warning" text="删除" @click="delStaff(index)"></am-button>
          </bui-list-item>
        </cell>
      </template>
      <header class="list-header">
        <text class="list-header-title">本校共 {{total}} 位教师</text>
        <am-icon @click="getStaffLists('refresh')" class="list-header-reload" type="reload" size="sm" />
      </header>
      <div v-if="staffListsLoading" class="list-loading"><wxc-part-loading show="true"></wxc-part-loading></div>
      <cell v-for="(one, index) in lists" :key="index" v-if="one.agree === 1">
        <bui-list-item :title="one.truename" :active-bg="true" @cellClick="openDialog(index, 'view')">
          <image slot="label" :src="one.avatar" class="list-avatar"></image>
          <am-button size="small" type="primary" text="编辑" @click="openDialog(index, 'edit')"></am-button>
        </bui-list-item>
      </cell>
    </list>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.searchbox {
  width: 500px;
}

.searchMsg {
  padding-left: @page-padding-spacing;
}

.list {
  &-loading {
    flex-direction: row;
    justify-content: center;
    background-color: @fill-base;
  }

  &-header {
    flex-direction: row;
    align-items: center;
    background-color: @brand-primary;

    &-title {
      color: @color-text-base-inverse;
      height: @list-title-height;
      line-height: @list-title-height;
    }

    &-reload {
      position: absolute;
      right: @page-padding-spacing;
      color: @color-text-base-inverse;
      width: 70px;
      height: @list-title-height;
      line-height: @list-title-height;
      text-align: center;
    }
    &-reload:active {
      background-color: @fill-tap;
    }
  }

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
import { mapState } from 'vuex'
import AmIcon from '../../components/am-icon.vue'
import AmNavBar from '../../components/am-nav-bar.vue'
import BuiListItem from '../../components/bui-list-item.vue'
import BuiSearchbarLeft from '../../components/bui-searchbar-left.vue'
import AmButton from '../../components/am-button.vue'
import WxcPartLoading from '../../components/wxc-part-loading.vue'
import Staff from './staff.class'

const staff = new Staff()

export default {
  name: 'staff',
  components: { AmIcon, AmNavBar, BuiListItem, AmButton, WxcPartLoading, BuiSearchbarLeft },
  props: {
    navBarBgColor: {
      type: String,
      default: '#108ee9'
    }
  },
  data () {
    return {
      editStaff: false,
      staffListsLoading: false,
      searchStaff: null,
      searchMsg: '',
      total: 0,
      totalToAgree: 0,
      totalNotAgree: 0
    }
  },
  computed: {
    lists: function() {
      return staff.outStaff(this.staffLists)
    },
    ...mapState(['schoolid', 'staffLists'])
  },
  created () {
    staff.setVue(this)

    if (this.schoolid) this.getStaffLists()
  },
  methods: {
    openDialog(index, op='edit') {
      const homedialog = { action: 'open', type: 'staff', op: op, index: index }
      this.$store.commit('setHomeDialog', homedialog)
      this.$emit('closePopup')
    },
    getStaffLists(op = null) {
      if (op === 'refresh') staff.cache.remove(staff.appCacheKey.school_cjiaowu_staffs)

      this.staffListsLoading = true
      staff.getStaffLists((lists) => {
        this.staffListsLoading = false
        this.$store.commit('setStaffLists', lists)
      })
    },
    onSearch (value) {
      const tel = value.trim()
      if (!tel || !staff.checkMobile(tel)) {
        this.$notice.alert({ message: '请输入老师手机号查找' })
      } else {
        staff.searchStaff(tel)
      }
    },
    addStaff () {
      staff.addStaff()
    },
    delStaff (index) {
      this.$notice.confirm({
        message: '确认要删除吗？',
        okCallback() {
          staff.delStaff(index)
        }
      })
    }
  }
}
</script>
