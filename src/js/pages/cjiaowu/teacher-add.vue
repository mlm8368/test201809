<template>
  <div>
    <wxc-searchbar
      placeholder="请输入老师姓名查找"
      return-key-type="search"
      :barStyle="{width: 700}"
      @wxcSearchbarInputReturned="wxcSearchbarInputReturned"></wxc-searchbar>
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
      <text class="teacherInfo-title">老师信息</text>
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
  height: 400px;
  flex-direction: column;
  align-items: flex-start;

  &-radio {
    margin-left: @page-padding-spacing;
    margin-right: @page-padding-spacing;
  }

  &-title {
    width: 660px;
    height: @list-title-height;
    line-height: @list-title-height;
    color: @color-text-base-inverse;
    background-color: @brand-primary;
    margin-left: @page-padding-spacing;
    padding-left: @page-padding-spacing;
  }
}
</style>

<script>
import { mapState } from 'vuex'
import WxcSearchbar from '../../components/wxc-searchbar.vue'
import AmListRadio from '../../components/am-list-radio.vue'
import TeacherAdd from './teacher-add.class'

const teacher = new TeacherAdd()

export default {
  name: 'teacher-add',
  components: { WxcSearchbar, AmListRadio },
  data () {
    return {
      searchMsg: '请查询教师后添加',
      searchTeachers: [],
      searchTeacherIndex: -1,
      teacherInfo: null
    }
  },
  computed: {
    ...mapState(['schoolid', 'classesid'])
  },
  created () {
    teacher.setVue(this)
  },
  methods: {
    wxcSearchbarInputReturned (e) {
      const keywords = e.value.trim()
      if (!keywords) {
        this.$notice.alert({ message: '请输入老师姓名查找' })
      } else {
        teacher.searchTeacher(keywords)
      }
    }
  }
}
</script>
