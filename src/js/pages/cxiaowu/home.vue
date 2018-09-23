<script lang="js" src="./home.js"></script>
<template>
  <div>
    <am-nav-bar 
      title="学校管理" 
      :left-btn = "[{is: 'icon', type: '\ue7dd', fontfamily: 'SchoolIconFont', key: 'profile'}]"
      :right-btn="[{is: 'icon', type: '\ue6b8', fontfamily: 'SchoolIconFont', key: 'home'}, {is: 'text', text: '发布', key: 'publish'}]"
      :style="{'padding-top': statusBarHeight, 'height': navBarHeight}"
      @click="navbarClick" />
  </div>
</template>
<style scoped>
</style>