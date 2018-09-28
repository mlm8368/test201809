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
    <text class="banji-title">学前二班</text>
    <div class="banji-info">
        <div><text>3人</text><text>老师</text></div>
        <div><text>学生</text><text>23人</text></div>
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
<style lang='less' scoped>
@import "../../../css/variable.less";

.banji-title {
  font-size: @font-size-heading;
  height: 45 * @hd;
  line-height: 45 * @hd;
  color: @color-text-base;
  text-align: center;
}
.banji-info {
  justify-content: flex-start;
}
</style>