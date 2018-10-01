<script lang="js" src="./home.js"></script>
<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      title="教学管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: '校老师', key: 'teacher'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick" />
    <text class="banji-title">学前二班</text>
    <div class="banji-info">
        <text class="banji-info-num">3人</text>
        <text class="banji-info-teacher">老师</text>
        <text class="banji-info-student">学生</text>
        <text class="banji-info-num">23人</text>
    </div>
    <am-list
          header="带描述"
        >
          <am-list-item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            title="钱包"
            brief="余额：100元"
          ></am-list-item>
        </am-list>
    <list class="banji-list">
      <header class="banji-list-header">
        <text class="banji-list-header-teacher">班级老师</text>
      </header>
      <bui-swipe-cell 
        :items="btnAry"
        :title="i.title" 
        :ref="`swipe_${index}`" 
        v-for="(i, index) in items"
        :key="index"
        >
        <am-list-item
            slot="content"
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            title="钱包"
            brief="余额：100元"
          ></am-list-item>
        </bui-swipe-cell>
      <header class="banji-list-header">
        <text class="banji-list-header-student">班级学生</text>
      </header>
      <bui-swipe-cell 
        :items="btnAry"
        :title="i.title" 
        :ref="`swipe_${index}`" 
        @swipeleft="swipeLeft"
        v-for="(i, index) in items"
        :key="index"
        ></bui-swipe-cell>
    </list>
      
    <am-popup
      :show.sync="popupShow"
      :position="popupPosition"
      width="500">
      <div :style="{'height': statusBarHeight}"></div>
        <text :style="{fontSize: '40px'}">popup</text>
        <am-button
          type="warning"
          @click="popupShow=false"
        ><text>点我关闭</text></am-button>
    </am-popup>
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
  
}
</style>