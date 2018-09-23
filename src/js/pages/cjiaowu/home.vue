<script lang="js" src="./home.js"></script>
<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      title="教学管理" 
      :left-btn = "[{is: 'text', text: '教职工', key: 'teacher'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick" />
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