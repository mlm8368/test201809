<script lang="js" src="./home.js"></script>
<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      title="教学管理" 
      :left-btn = "[{is: 'text', text: '教职工', key: 'teacher'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick" />
    <scroller>
      <am-flex direction="column" justify="center" align="center" wrap="wrap">
        <div><text>学前二班</text></div>
        <div>
          <am-flex direction="row" justify="center" align="center" wrap="wrap">
            <div><text>老师</text></div>
            <div><text>学生</text></div>
          </am-flex>
        </div>
      </am-flex>
      <div v-for="(i, index) in items" :key="index">
          <bui-swipe-cell :items="btnAry"
                          :title="i.title" 
                          :ref="`swipe_${index}`" 
                          @swipeleft="swipeLeft"
                          ></bui-swipe-cell>
      </div>
    </scroller>
    <am-popup
      :show.sync="popupShow"
      :position="popupPosition"
      width="500">
      <div :style="{'height': statusBarHeight}"></div>
      <am-wing-blank>
        <text :style="{fontSize: '40px'}">popup</text>
        <am-white-space></am-white-space>
        <am-button
          type="warning"
          @click="popupShow=false"
        ><text>点我关闭</text></am-button>
      </am-wing-blank>
    </am-popup>
  </div>
</template>
<style scoped>
</style>