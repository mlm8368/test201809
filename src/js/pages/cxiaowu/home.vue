<template>
  <div>
    <slider class="banner" interval="3000" auto-play="true" show-indicators="true">
      <div class="banner-frame" v-for="(img, index) in bannerImgList" :key="index">
        <image class="banner-frame-image" resize="cover" :src="img"></image>
      </div>
      <indicator class="banner-indicator"></indicator>
    </slider>
    <div class="notice">
      <am-icon class="notice-icon" type="notification" size="sm" />
      <text class="notice-text">最新公告：</text>
      <text class="notice-title">[09-23] 关于下周开会讨论新学期教学计划及详细课程安排的通知</text>
    </div>
    <am-grid 
      :data="gridList" 
      :column-num="4"
      :has-line="false"></am-grid>
  </div>
</template>

<style lang="less" scoped>
@import "../../../css/variable.less";

.banner {
  height: 400px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: @border-color-base;

  &-frame {
    position: relative;

    &-image {
      width: 750px;
      height: 400px;
    }
  }

  &-indicator {
    width: 750px;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    item-color: #ffffff;
    item-selectedColor: #747474;
    item-size: 20px;
    opacity: 0.8;
  }
}

.notice {
  flex-direction: row;
  width: 750px;
  padding-left: @page-padding-spacing;
  padding-right: @page-padding-spacing;

  &-icon {
    height: 100px;
    line-height: 100px;
    color: @color-text-secondary;
  }

  &-text {
    height: 100px;
    line-height: 100px;
    color: @color-text-secondary;
  }

  &-title {
    flex: 1;
    lines: 1;
    height: 100px;
    line-height: 100px;
    text-overflow: ellipsis;
    color: @color-text-paragraph;
  }
}

</style>

<script>
import { mapState } from 'vuex'
import AmIcon from '../../components/am-icon.vue'
import AmGrid from '../../components/am-grid.vue'
import Home from './home.class'

const home = new Home()

export default {
  name: 'home',
  components: { AmIcon, AmGrid },
  data () {
    return {
      bannerImgList: [],
      gridList: [
        { icon: 'bmlocal://assets/tmp/kh.png', text: '公告'},
        { icon: 'bmlocal://assets/tmp/news.png', text: '新闻'},
        { icon: 'bmlocal://assets/tmp/news.png', text: '签到'},
        { icon: 'bmlocal://assets/tmp/news.png', text: '菜谱'},
      ]
    }
  },
  computed: {
    ddd: function() {
      return 1
    },
    ...mapState(['schoolid'])
  },
  created () {
    home.setVue(this)

    home.getSchool((userinfo) => {
      if (userinfo.banners.length > 0) this.bannerImgList = userinfo.banners
    })
  }
}
</script>
