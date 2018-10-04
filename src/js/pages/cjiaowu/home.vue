<script lang="js" src="./home.js"></script>
<template>
  <div>
    <text class="banji-title">{{classesName}}</text>
    <div class="banji-info">
        <text class="banji-info-num">{{totalTeacher}}人</text>
        <text class="banji-info-teacher">老师</text>
        <text class="banji-info-student">学生</text>
        <text class="banji-info-num">{{totalStudent}}人</text>
    </div>
    <list class="banji-list">
      <header class="banji-list-header">
        <text class="banji-list-header-teacher">班级老师</text>
      </header>
      <bui-swipe-cell 
        :items="btnAry"
        v-for="(i, index) in teacherLists"
        :key="index"
        @actionClick="listActionClick(index,$event)">
        <am-list-item
          slot="content"
          :title="i.truename" 
          :brief="i.teacherpost"
          arrow="empty"
          @click="listClick(index)"
          >
            <image slot="extra" :src="i.avatar" class="banji-list-avatar"></image>
          </am-list-item>
        </bui-swipe-cell>
      <header class="banji-list-header">
        <text class="banji-list-header-student">班级学生</text>
      </header>
      <bui-swipe-cell 
        :items="btnAry"
        v-for="(i, index) in studentLists"
        :key="index"
        @actionClick="listActionClick(index,$event)">
          <am-list-item
          slot="content"
          :title="i.babyname" 
          :brief="i.age"
          arrow="empty"
          @click="listClick(index)"
          >
            <image slot="extra" :src="i.avatar" class="banji-list-avatar"></image>
          </am-list-item>
        </bui-swipe-cell>
    </list>
  </div>
</template>
<style lang='less' scoped>
@import "../../../css/variable.less";

.banji-title {
  font-size: @font-size-heading;
  height: 90px;
  line-height: 90px;
  color: @brand-primary;
  text-align: center;
}
.banji-info {
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;

  &-num {
    color: red;
  }

  &-teacher {
    padding-left: @h-spacing-md;
    padding-right: @h-spacing-sm;
    border-right-width: @border-width-lg;
    border-right-style: solid;
    border-right-color: @border-color-base;
  }

  &-student {
    padding-left: @h-spacing-sm;
    padding-right: @h-spacing-md;

  }
}
.banji-list {
  width: 750px;

  &-header {
    flex-direction: row;
    align-items: center;

    &-teacher,&-student {
      width: 750px;
      height: @list-title-height;
      line-height: @list-title-height;
      background-color: @brand-primary;
      padding-left: @page-padding-spacing;
      color: @color-text-base-inverse;
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