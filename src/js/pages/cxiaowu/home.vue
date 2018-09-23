<script lang="js" src="./home.js"></script>
<template>
  <div>
    <am-nav-bar 
      title="学校管理" 
      :left-btn = "[{is: 'icon', type: '\ue7dd', fontfamily: 'SchoolIconFont', key: 'profile'}]"
      :right-btn="[{is: 'icon', type: '\ue6b8', fontfamily: 'SchoolIconFont', key: 'home'}, {is: 'text', text: '发布', key: 'publish'}]"
      :style="{'padding-top': statusBarHeight, 'height': navBarHeight}"
      @click="navbarClick" />
    <am-popup
      :show.sync="popupShow"
      :position="popupPosition"
      :height="popupHeight"
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