<template>
  <cell class="bui-cell-swipe-menu">
      <div :style="{'height': height}" class="bui-list-swipe" ref='swipeBox'>
          <slot name="action">
              <div class="bui-list-swipe-btn" :style="{'background-color': item.bgcolor}" @click="_actionClick(index)" :key="index" v-for="(item, index) in items">
                  <text class="bui-list-swipe-btn-text">{{item.title}}</text>
              </div>
          </slot>
      </div>
      <div @click="_click" @swipe="_swipe($event)" @shouldStopPropagation="_shouldStopPropagation" :style="{'height': height}" class="bui-list-swipe-main" ref="swipedom">
          <slot name="content">
              <text class="bui-list-title" v-if="title">{{title}}</text>
          </slot>
      </div>
  </cell>
</template>

<script>
const animation = weex.requireModule("animation")
let defaultAction = [
  { title: "取消", bgcolor: "#c6c7c8" },
  { title: "删除", bgcolor: "#fa3300" }
]
export default {
  name: 'bui-swipe-cell',
  props: {
    items: {
      type: Array,
      default() {
        return defaultAction
      }
    },
    height: {
      type: String,
      default: "100px"
    },
    title: {
      type: String
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      noBorder: this.noBorder
    }
  },
  methods: {
    //操作点击事件
    _actionClick(index) {
      this.close(() => {
        this.$emit("actionClick", index);
      })
    },
    _swipe(e) {
      switch (e.direction) {
        case "left":
          this.open(() => {
            this.$emit("swipeleft");
          })
          break
        case "right":
          this.close(() => {
            this.$emit("swiperight");
          })
          break
      }
    },
    _click() {
      this.$emit("click")
      this.close()
    },
    _shouldStopPropagation() {
      return false
    },
    close(fn) {
      let translate = "translate(0px, 0px)";
      let el = this.$refs.swipedom;
      this._animationFn(el, 1, translate, "ease-in", () => {
        fn && fn();
      })
    },
    open(fn) {
      let swipeDom = this.$refs.swipeBox;
      let lenDom;
      if (swipeDom.hasOwnProperty("pureChildren"))
        lenDom = swipeDom.pureChildren;
      else lenDom = this.$refs.swipeBox.children;
      let len = (lenDom && lenDom.length) || 0;
      let translate = "translate(-" + 120 * len + "px, 0px)";
      let el = this.$refs.swipedom;
      this._animationFn(el, 1, translate, "ease-in", () => {
        fn && fn();
      })
    },
    _animationFn(el, opacity, translate, timing, fn) {
      animation.transition(
        el,
        {
          styles: {
            opacity: opacity,
            transform: translate,
            transformOrigin: "center center"
          },
          duration: 200,
          timingFunction: timing,
          delay: 0
        },
        () => {
          fn && fn();
        }
      )
    }
  }
}
</script>

<style scoped lang="less">
@import "../../css/variable.less";

.bui-cell-swipe-menu {
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: @border-color-base;
  border-bottom-style: solid;
}
.bui-list-swipe {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  flex-direction: row;
  justify-content: flex-end;
}
.bui-list-swipe-btn {
  flex-direction: row;
  width: 120px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #c6c7c8;
}
.bui-list-swipe-btn-text {
  font-size: 30px;
  color: @color-text-base-inverse;
}
.bui-list-swipe-main {
  flex: 1;
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
}
.bui-list-title {
  font-size: @font-size-caption;
  color: @color-text-base;
  text-overflow: ellipsis;
}
</style>