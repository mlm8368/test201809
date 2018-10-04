<script lang="js" src="./app.js"></script>
<template>
  <div>
    <div :style="{'height': statusBarHeight, 'background-color': navBarBgColor}"></div>
    <am-nav-bar 
      title="教学管理" 
      text-color="#FFFFFF"
      :background-color="navBarBgColor"
      :left-btn = "[{is: 'text', text: '校老师', key: 'teacher'}]"
      :right-btn="[{is: 'text', text: '班级', key: 'classes'}]"
      @click="navbarClick">
    </am-nav-bar>
    <am-popup
      :show.sync="popupShow"
      :position="popupPosition"
      width="500">
      <text>点我关闭</text>
    </am-popup>
  </div>
</template>

