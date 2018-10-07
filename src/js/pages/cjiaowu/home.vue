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
        <am-icon @click="getTeacherLists('refresh')" class="banji-list-header-reload" type="reload" size="sm" />
        <am-icon @click="openDialog('teacher')" class="banji-list-header-plus" type="plus" size="sm" />
      </header>
      <cell v-if="teacherListsLoading" class="banji-list-loading"><wxc-part-loading show="true"></wxc-part-loading></cell>
      <bui-swipe-cell 
        :items="btnAry"
        v-for="(i, index) in teacherLists"
        :key="index"
        @actionClick="listActionClick(index, 'teacher', $event)">
        <am-list-item
          slot="content"
          :title="i.truename" 
          :brief="i.teacherpost"
          arrow="empty"
          @click="listClick('teacher', index)"
          >
            <image slot="extra" :src="i.avatar" class="banji-list-avatar"></image>
          </am-list-item>
        </bui-swipe-cell>
      <header class="banji-list-header">
        <text class="banji-list-header-student">班级学生</text>
        <am-icon @click="getStudentLists('refresh')" class="banji-list-header-reload" type="reload" size="sm" />
        <am-icon @click="openDialog('student')" class="banji-list-header-plus" type="plus" size="sm" />
      </header>
      <cell v-if="studentListsLoading" class="banji-list-loading"><wxc-part-loading show="true"></wxc-part-loading></cell>
      <bui-swipe-cell 
        :items="btnAry"
        v-for="(i, index) in studentLists"
        :key="index"
        @actionClick="listActionClick(index, 'student', $event)">
          <am-list-item
          slot="content"
          :title="i.babyname" 
          :brief="i.age"
          arrow="empty"
          @click="listClick('student', index)">
            <image slot="extra" :src="i.avatar" class="banji-list-avatar"></image>
          </am-list-item>
        </bui-swipe-cell>
    </list>
    <bmmask class="bmmask" animation="scale" position="center" duration="300" disableMaskEvent="true" ref="bmmask">
      <bmpop :style="{'width': dialog.width, 'height': dialog.height}" class="bmpop">
        <div class="dialog-header">
          <text class="dialog-header-title">{{dialog.title}}</text>
          <am-icon
            @click="closeDialog"
            class="dialog-header-close"
            type="close"
            size="sm" />
        </div>
        <div class="dialog-body">
          <component :is="currentDialogComponent"></component>
        </div>
      </bmpop>
    </bmmask>
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
    background-color: @brand-primary;

    &-teacher,&-student {
      // width: 750px;
      height: @list-title-height;
      line-height: @list-title-height;
      padding-left: @page-padding-spacing;
      color: @color-text-base-inverse;
    }
    &-reload {
      color: @color-text-base-inverse;
      width: 70px;
      height: @list-title-height;
      line-height: @list-title-height;
      text-align: center;
    }
    &-reload:active {
      background-color: @fill-tap;
    }
    &-plus {
      color: @color-text-base-inverse;
      position: absolute;
      right: @page-padding-spacing;
      width: 70px;
      height: @list-title-height;
      line-height: @list-title-height;
      text-align: center;
    }
    &-plus:active {
      background-color: @fill-tap;
    }
  }

  &-loading {
    flex-direction: row;
    justify-content: center;
    background-color: @fill-base;
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

.bmmask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
}
.bmpop {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: @fill-base;
}
.dialog-header {
  background-color: @brand-primary;
  flex-direction: row;
  align-content: center;
  padding-left: @page-padding-spacing;

  &-title,&-close {
    color: @color-text-base-inverse;
    height: @list-title-height;
    line-height: @list-title-height;
  }
  &-close {
    position: absolute;
    right: 0;
    width: 70px;
    text-align: center;
  }
  &-close:active {
    background-color: @fill-tap;
  }
}
.dialog-body {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>