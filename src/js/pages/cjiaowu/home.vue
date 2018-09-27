<script lang="js" src="./home.js"></script>
<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      title="教学管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: '教职工', key: 'teacher'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick" />
    <div class="banji"><text class="banji-title">学前二班</text></div>
    <div>
        <div><text>老师</text></div>
        <div><text>学生</text></div>
    </div>
    <list>
      <header>
        <text>班级老师</text>
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
<style scoped lang="less">
@import "../../../css/variable.less";

.banji {
  heigh: 25 * @hd;
  
  &-title {
    color: @color-text-base;
  }
}
</style>