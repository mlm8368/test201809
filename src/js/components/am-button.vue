<template>
  <!-- <div :class="btnClass" :style="btnStyle" @click="handleClick"> -->
    <text
      :class="btnClass"
      :style="_style"
      @touchstart="_touchstart"
      @touchend="_touchend"
      @touchcancel="_touchend"
      @click="handleClick"
    ><slot>{{text}}</slot></text>
    <!-- <div @click="handleClick" v-if="!disabled" class="overlay" ></div> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: 'am-button',
  props: {
    width: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: '确认'
    },
    size: {
      type: String,
      default: 'large'
    },
    type: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    btnClass () {
      const classMap = {
        'am-button': true
      }
      classMap[`am-button-${this.type}`] = true
      classMap[`am-button-${this.type}-active`] = !this.disabled && this.active
      classMap[`am-button-${this.type}-disabled`] = this.disabled
      classMap['am-button-small'] = this.size === 'small'
      return Object.keys(classMap).filter(val => classMap[val])
    },
    _style () {
      const _style = this.btnStyle
      if (this.width) {
        _style.width = this.width
      }
      return _style
    }
  },
  methods: {
    _touchstart () {
      this.active = true
    },
    _touchend () {
      this.active = false
    },
    handleClick (event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../css/variable.less";

.am-button {
  // width: @button-width;
  height: @button-height;
  line-height: @button-height;
  text-align: center;
  border-width: @border-width-sm;
  border-style: solid;
  border-radius: @button-radius;
  font-size: @button-font-size;
  padding-left: @h-spacing-lg;
  padding-right: @h-spacing-lg;

  
  &-default {
    color: @default-button-color;
    background-color: @default-button-fill;
    border-color: @default-button-border-color;
    &-active {
      background-color: @default-button-fill-tap;
      border-color: @default-button-border-color-tap;
    }
    &-disabled {
      opacity: @default-button-opacity-disabled;
      color: @default-button-color-disabled;
    }
  }

  &-primary {
    color: @primary-button-color;
    background-color: @primary-button-fill;
    border-color: @primary-button-border-color;
    &-active {
      background-color: @primary-button-fill-tap;
      border-color: @primary-button-border-color-tap;
      color: @primary-button-color-tap;
    }
    &-disabled {
      opacity: @primary-button-opacity-disabled;
      color: @primary-button-color-disabled;
    }
  }
  &-warning {
    color: @warning-button-color;
    background-color: @warning-button-fill;
    border-color: @warning-button-border-color;
    &-active {
      background-color: @warning-button-fill-tap;
      border-color: @warning-button-border-color-tap;
      color: @warning-button-color-tap;
    }
    &-disabled {
      opacity: @warning-button-opacity-disabled;
      color: @warning-button-color-disabled;
    }
  }

  &-ghost {
    background-color: transparent;
    border-color: @ghost-button-color;
    color: @ghost-button-color;
    &-active {
      color: @ghost-button-fill-tap;
      border-color: @ghost-button-fill-tap;
    }
    &-disabled {
      color: @ghost-button-color-disabled;
      border-color: @ghost-button-color-disabled;
    }
  }

  &-small {
    font-size: @button-font-size-sm;
    height: @button-height-sm;
    line-height: @button-height-sm;
  }

}
</style>