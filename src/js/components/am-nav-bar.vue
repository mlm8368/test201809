<template>
  <div :class="['am-nav-bar', `am-nav-bar-${mode}`]">
    <div class="am-nav-bar-left">
      <slot name="left">
        <div
          v-for="(item, index) in left"
          :key="index"
          :class="['am-nav-bar-btn', `am-nav-bar-${mode}-btn`]"
          @click="handleClick(item)"
        >
          <am-icon
            v-if="item.is === 'icon'"
            :type="item.type"
            :class="['am-nav-bar-btn-icon', `am-nav-bar-${mode}-btn-icon`]"
          />
          <text
            v-else-if="item.is === 'text'"
            :class="['am-nav-bar-btn-text', `am-nav-bar-${mode}-btn-text`]"
          >{{item.text}}</text>
          <!-- <image v-else-if="item.is === 'image'" :src="item.src"/> -->
        </div>
      </slot>
    </div>
    <slot name="title">
      <text @click="handleClick({key: 'title'})" :class="['am-nav-bar-title', `am-nav-bar-${mode}-title`]">{{title}}</text>
    </slot>
    <div class="am-nav-bar-right">
      <slot name="right">
        <div
          v-for="(item, index) in right"
          :key="index"
          @click="handleClick(item)"
          :class="['am-nav-bar-btn', `am-nav-bar-${mode}-btn`]"
        >
          <am-icon
            v-if="item.is === 'icon'"
            :type="item.type"
            :class="['am-nav-bar-btn-icon', `am-nav-bar-${mode}-btn-icon`]"
          />
          <text
            v-else-if="item.is === 'text'"
            :class="['am-nav-bar-btn-text', `am-nav-bar-${mode}-btn-text`]"
          >{{item.text}}</text>
          <!-- <image v-else-if="item.is === 'image'" :src="item.src"/> -->
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import AmIcon from './am-icon.vue'
const Navigator = weex.requireModule('navigator')
export default {
  name: 'am-nav-bar',
  props: {
    mode: {
      type: String,
      default: 'dark' // dark, light
    },
    title: {
      type: String,
      default: null
    },
    leftBtn: {
      type: Array,
      default: () => [{
        is: 'icon',
        type: 'left',
        onClick () {
          Navigator.pop({}, e => {})
        }
      }]
    },
    rightBtn: {
      type: Array,
      default: () => []
    }
  },
  components: { AmIcon },
  computed: {
    navBarClass () {
      return [
        `am-nav-bar-${this.mode}`
      ]
    },
    titleClass () {
      return [
        `am-nav-bar-${this.mode}-title`
      ]
    },
    left () {
      return this.makeBtn(this.leftBtn)
    },
    right () {
      return this.makeBtn(this.rightBtn)
    }
  },
  methods: {
    makeBtn (btns) {
      return btns.map(item => {
        let option = item
        if (typeof item === 'string') {
          option = {
            is: 'icon',
            type: item
          }
        }
        return option
      })
    },
    handleClick (item) {
      if (typeof item.onClick === 'function') {
        item.onClick()
      } else {
        this.$emit('click', item.key || item.type || item.text || item.src)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../css/variable.less";

@navbar-height: 45 * @hd;

.am-nav-bar {
  // align-items: center;
  align-items: stretch;
  height: @navbar-height;
  background-color: @brand-primary;
  flex-direction: row;

  &-left,
  &-right {
    flex: 1;
    align-items: stretch;
    // align-items: center;
    flex-direction: row;
  }

  &-title {
    flex: 2;
    text-align: center;
    align-self: center;
    // justify-content: center;
    font-size: 18 * @hd;
    white-space: nowrap;
    color: @fill-base;
  }

  &-right {
    justify-content: flex-end;
    // margin-right: @h-spacing-lg;
  }

  &-btn {
    // height: @navbar-height;
    min-width: @navbar-height;
    padding-left: 11.5 * @hd;
    padding-right: 11.5 * @hd;
    align-items: center;
    justify-content: center;
    &:active {
      background-color: @brand-primary-tap;
    }
    &-icon {
      color: @fill-base;
    }
    &-text {
      font-size: @link-button-font-size;
      color: @fill-base;
    }
  }



  &-light {
    background-color: @fill-base;
    
    &-title {
      color: @color-text-base;
    }

    &-btn {
      &:active {
        background-color: @fill-tap;
      }
      &-icon, &-text {
        color: @brand-primary;
      }
    }
  }

}
</style>