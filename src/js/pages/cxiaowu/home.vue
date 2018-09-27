<script lang="js" src="./home.js"></script>
<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      title="学校管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "['profile']"
      :right-btn="['home', {is: 'text', text: '发布', key: 'publish'}]"
      @click="navbarClick" />
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
<style scoped>
</style>