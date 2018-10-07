<template>
  <div>
    <bui-searchbar-left @search="onSearch" placeholder="请输入老师姓名查找"></bui-searchbar-left>
    <text v-if="searchMsg" class="searchMsg">{{searchMsg}}</text>
    <scroller class="teacherInfo">
      <div>
        <am-list-radio
          class="teacherInfo-radio"
          v-for="(one,index) in searchTeachers"
          :key="index"
          :thumb="one.avatar"
          :title="one.truename"
          :checked="searchTeacherIndex === index"
          @change="searchTeacherIndex = index"></am-list-radio>
      </div>
      <template v-if="teacherInfo">
        <text class="teacherInfo-header">老师信息</text>
        <bui-list-item :title="teacherInfo.truename" label="姓名">
          <image slot="action" :src="teacherInfo.avatar" class="teacherInfo-avatar"></image>
        </bui-list-item>
        <bui-list-item :title="teacherInfo.mobile" label="电话"></bui-list-item>
        <bui-list-item :title="teacherInfo.gender" label="性别"></bui-list-item>
        <bui-list-item :title="teacherInfo.qq" label="QQ"></bui-list-item>
        <bui-list-item :title="teacherInfo.wx" label="微信"></bui-list-item>
        <div class="teacherInfo-button"><am-button width="500px" size="small" text="添加" @click="buttonClick"></am-button></div>
      </template>
    </scroller>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.searchMsg {
  padding-left: @page-padding-spacing;
}

.teacherInfo {
  width: 700px;
  height: 625px;
  flex-direction: column;
  align-items: flex-start;

  &-radio {
    margin-left: @page-padding-spacing;
    margin-right: @page-padding-spacing;
  }

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
import AmListRadio from '../../components/am-list-radio.vue'
import AmButton from '../../components/am-button.vue'
import BuiSearchbarLeft from '../../components/bui-searchbar-left.vue'
import BuiListItem from '../../components/bui-list-item.vue'
import TeacherAdd from './teacher-add.class'

const teacher = new TeacherAdd()

export default {
  name: 'teacher-add',
  components: { AmListRadio, AmButton, BuiSearchbarLeft, BuiListItem },
  data () {
    return {
      searchMsg: '请查询教师后添加',
      searchTeachers: [],
      searchTeacherIndex: -1
    }
  },
  computed: {
    teacherInfo: function() {
      if (this.searchTeacherIndex > -1) return this.searchTeachers[this.searchTeacherIndex]
      else return null
    },
    ...mapState(['schoolid', 'classesid'])
  },
  created () {
    teacher.setVue(this)
  },
  methods: {
    onSearch (value) {
      const keywords = value.trim()
      if (!keywords) {
        this.$notice.alert({ message: '请输入老师姓名查找' })
      } else {
        teacher.searchTeacher(keywords)
      }
    },
    buttonClick () {
      teacher.addTeacher()
    }
  }
}
</script>
