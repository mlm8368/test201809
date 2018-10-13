<template>
  <div>
    <bui-searchbar-left class="search-bar" @search="onSearch" placeholder="请输入(或扫码)宝宝ID号查询">
      <am-icon type="scan" color="#ccc" size="lg" />
    </bui-searchbar-left>
    <text v-if="searchMsg" class="searchMsg">{{searchMsg}}</text>
    <scroller class="studentInfo">
      <template v-if="studentInfo">
        <text class="studentInfo-header">宝宝信息</text>
        <bui-list-item :title="studentInfo.babyname" label="姓名">
          <image slot="action" :src="studentInfo.avatar" class="studentInfo-avatar"></image>
        </bui-list-item>
        <bui-list-item v-for="(one, index) in studentInfo.parents" :key="index" :title="one.truename" :label="one.call">
          <text>Tel：{{one.mobile}}</text>
        </bui-list-item>
        <bui-list-item :title="studentInfo.gender" label="性别"></bui-list-item>
        <bui-list-item :title="studentInfo.birthday" label="生日"></bui-list-item>
        <div class="studentInfo-button"><am-button width="500px" size="small" text="添加" @click="buttonClick"></am-button></div>
      </template>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.searchMsg {
  padding-left: @page-padding-spacing;
}

.studentInfo {
  width: 700px;
  height: 625px;
  flex-direction: column;
  align-items: flex-start;

  &-header {
    width: 700px;
    height: @list-title-height;
    line-height: @list-title-height;
    color: @color-text-base-inverse;
    background-color: @brand-primary;
    padding-left: @page-padding-spacing;
  }

  &-avatar {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border-width: 1px;
    border-style: solid;
    border-color: @border-color-base;
  }

  &-button {
    width: 700px;
    justify-content: center;
    align-items: center;
    margin-top: @v-spacing-md;
    margin-bottom: @v-spacing-md;
  }
}
</style>

<script>
import { mapState } from 'vuex'
import BuiListItem from '../../components/bui-list-item.vue'
import BuiSearchbarLeft from '../../components/bui-searchbar-left.vue'
import AmIcon from '../../components/am-icon.vue'
import AmButton from '../../components/am-button.vue'
import StudentAdd from './student-add.class'

const student = new StudentAdd()

export default {
  name: 'student-add',
  components: { BuiListItem, BuiSearchbarLeft, AmIcon, AmButton },
  data () {
    return {
      searchMsg: '请家长提供下宝宝的ID号或二维码图片',
      studentInfo: null
    }
  },
  computed: {
    ...mapState(['classesid'])
  },
  created () {
    student.setVue(this)
  },
  methods: {
    onSearch (value) {
      const keywords = value.trim()
      if (!keywords) {
        this.$notice.alert({ message: '请输入宝宝的ID号查找' })
      } else {
        student.searchStudent(keywords)
      }
    },
    buttonClick () {
      student.addStudent()
    }
  }
}
</script>
